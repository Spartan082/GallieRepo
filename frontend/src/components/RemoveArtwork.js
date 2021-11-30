import React, { useState } from 'react';
import axios from 'axios'; 
import AWS from 'aws-sdk';

const RemoveArtwork = () => {
  
  const [artworkName, setArtworkName] = useState('');
  const [message, setMessage] = useState(null);

  const config = new AWS.S3 ({
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_BUCKET_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });

  const handleS3Delete = async (filename) => {
    const params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME, 
      Key: filename  
    };

    config.deleteObject(params, function(err, data) {
      if (err) 
        console.log(err);
      else
        console.log("Successfully deleted file from bucket");
        console.log(data);
    });
  }

  const deletePostInfo = (response) => {
    //delete the image from s3 bucket
    handleS3Delete( response[0].artworkURL );

    //delete post info to database
    axios
      .delete(process.env.REACT_APP_IP_ADDRESS + '/deleteArt', 
        { data : 
          {  
            profileID: response[0].profileID,
            artworkName: artworkName,
          }
        })
      .then((res) => {
        //console.log(res.data)
        setMessage('Removal Successful');
        setArtworkName('');
      }).catch((error) => {
        //console.log(error)
        setMessage('Post Not Found');
      });
  }

  const deleteArt = (loginStatus, profileId, profileStatus) => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/postByName', {
      params: {
          artworkName: artworkName,
      }
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.length !== 0) {
        //if moderator account, can delete any artwork
        if (loginStatus === true && profileStatus === "Moderator") {
          deletePostInfo(res.data);
        }
        //if artist account, make sure artist is deleting only their artwork
        else if (loginStatus === true && profileStatus === "Artist" && profileId === res.data[0].profileID) {
          deletePostInfo(res.data);
        }
        else {
          setArtworkName('');
          setMessage('Unable to delete artwork. Please make sure you are logged in.');
        }
      }
      else {
        setArtworkName('');
        setMessage('Artwork Not Found');
      }
    }).catch((error) => {
        console.log(error);
        setMessage("An Error Occured. Please Try Again.");
    });
  }

  const determineLoginStatus = () => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/login')
      .then((res) => {
        console.log(res.data)
         //if user is logged in set the profileId
        if (res.data.loggedIn === true)
        {
          deleteArt(true, res.data.user[0].profileID, res.data.user[0].status);
        }
        else {
          setMessage("Please login to remove artwork");
        }
      }).catch((error) => {
        //console.log(error)
        setMessage(error.message);
      });
  }

  const submitForm = () => {
    setMessage('');
    //make sure all fields are populated
    if (artworkName.trim() === '') {
      setMessage('All fields are required');
      return;
    }

     //make sure all fields do not exceed maximum length
     if(artworkName.length > 29)
     {
       setMessage('Artwork Name is too long. Maximum length is 29 characters.');
       return;
     }

    //determine whether the user is logged in and take appropriate action
    determineLoginStatus();
  }
  
    return (
      <div align="center">
        <div className="profile"> 
         
            <div className="form_container">
              <h1 className="form__title">Remove Artwork</h1>

              <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Artwork Name" value={artworkName} onChange={event => setArtworkName(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
              </div>

              <button className="form__button" type="submit" onClick={submitForm}>Remove</button>
            </div>
          
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    );
}
  
  export default RemoveArtwork;
  