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

  const submitForm = () => {
    setMessage('');
    //make sure all fields are populated
    if (artworkName.trim() === '') {
      setMessage('All fields are required');
      return;
    }

    axios.get(process.env.REACT_APP_IP_ADDRESS + '/postById', {
        params: {
            profileID: '031771113',
            artworkName: artworkName,
        }
    })
    .then((res) => {
        console.log(res.data);
        deletePostInfo(res.data);
    }).catch((error) => {
        console.log(error)
    });


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
  