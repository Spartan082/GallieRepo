import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios'; 

const Artwork = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');

  const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_BUCKET_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  }

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
      setFilename(e.target.files[0]?.name);
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  const submitForm = () => {
    //make sure attached file is an image
    var ext =  filename?.split('.').pop();
    if(ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'jfif')
    {
      setMessage('Must upload an image');
      return;
    }

    //make sure all fields are populated
    if (name.trim() === '' || description.trim() === '') {
      setMessage('All fields are required');
      return;
    }

    //add the image to s3 bucket
    handleUpload(selectedFile);
   
    setMessage(null);

    //get the current date
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const requestBody = {
      profileID: '031771113',
      artworkName: name,
      prodDesc: description,
      postDate: date,
      artworkURL: filename
    }

    const address= process.env.REACT_APP_IP_ADDRESS + '/uploadArt';
    //add post info to database
    axios.post(address, requestBody)
      .then((res) => {
        //console.log(res.data)
        setMessage('Upload Successful');
        setName('');
        setDescription('');
      }).catch((error) => {
        //console.log(error)
        setMessage(error.message);
      });
  }

    return (
      <div align="center">
        <div className="profile"> 
         
            <div className="form_container">
              <h1 className="form__title">Upload Artwork</h1>

              <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Artwork Name" value={name} onChange={event => setName(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
              </div>

              <div className="form__input-group">
                <input type="text" class="form__input" autoFocus placeholder="Artwork Description" value={description} onChange={event => setDescription(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
              </div>

              <div className='fileUpload'>
                <input type="file" onChange={handleFileInput}/>
              </div>

              <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
            </div>
          
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    );
}
  
  export default Artwork;
  