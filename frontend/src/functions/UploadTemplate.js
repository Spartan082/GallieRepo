import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios';
import NumberGenerator from './NumberGenerator';

function UploadTemplate() {
    const [artType, setArtType] = useState('');
    const [artPrice, setPrice] = useState(0);
    const [artDescription, setArtDescription] = useState('');
    const [message, setMessage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filename, setFilename] = useState('');

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    }

    console.log(config.bucketName);
    console.log(config.region);
    console.log(config.accessKeyId);
    console.log(config.secretAccessKey);

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
        if (artType.trim() === '' || artPrice <= 0 || artDescription.trim() === '' ||
            (artType !== 'Icon' && artType !== 'Sketch' && artType !== 'Flat Color' && artType !== 'Lineart' && artType !== 'Shaded' && artType !== 'Logo')){
            var message = "All fields are required and valid\n";
            if(artType.trim() === '' || (artType !== 'Icon' && artType !== 'Sketch' && artType !== 'Flat Color' && artType !== 'Lineart' && artType !== 'Shaded' && artType !== 'Logo')){
                message = message + "Invalid Template Type\n";
            }
            if(artPrice <= 0){
                message = message + "Invalid Template Price\n";
            }
            if(artDescription.trim() === ''){
                message = message + "Invalid Template Description\n";
            }
            console.log(message);
            alert(message);
            return;
        }

        //add the image to s3 bucket
        handleUpload(selectedFile);
   
        setMessage(null);

        //get the current date
        var date = new Date();

        const requestBody = {
            templateVersionID: NumberGenerator(),
            artType: artType,
            artPrice: artPrice,
            artDescription: artDescription, 
            artExURL: filename,
            postDate: date
        }

        console.log(requestBody);

        //add post info to database
        axios.post(process.env.REACT_APP_IP_ADDRESS + '/TemplateModify', requestBody)
            .then((res) => {
            //console.log(res.data)
            alert('Upload Successful');
            setArtType('');
            setPrice(0);
            setArtDescription('');
        }).catch((error) => {
            //console.log(error)
            setMessage(error.message);
        });
    }

    

    return (
        <div align="center">
        <div className="profile"> 
            <div className="form_container">
                <h2 className="form__title">Upload Template</h2>
                <div className="form__input-group">
                    <input list="artType" class="form__input" autoFocus placeholder="Template Type" 
                    onChange={event => setArtType(event.target.value)} />
                    <datalist id ="artType">
                        <option value="Icon"></option>
                        <option value="Sketch"></option>
                        <option value="Lineart"></option>
                        <option value="Flat Color"></option>
                        <option value="Shaded"></option>
                        <option value="Logo"></option>
                    </datalist>
                    <div className="form__input-error-message"></div>
                </div>
                <div style={{marginTop: 20 + 'px'}} className="form__input-group">
                    <input type="number"class="form__input" min="0" max="1001" maxautoFocus placeholder="Template Price" 
                    value={artPrice} onChange={event => setPrice(event.target.value)} /> <br/>
                    <div className="form__input-error-message"></div>
                </div>

                <div className="form__input-group">
                    <input type="text"class="form__input" maxlength="2999" autoFocus placeholder="Template Description" 
                    value={artDescription} onChange={event => setArtDescription(event.target.value)} /> <br/>
                    <div className="form__input-error-message"></div>
                </div>
    
                <div className='fileUpload'>
                    <input type="file" onChange={handleFileInput}/>
                </div>
    
                <button style={{marginTop: 20 + 'px'}} className="form__button" type="submit" onClick={submitForm}>Submit</button>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
        </div>
      );
}

export default UploadTemplate;