import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios';

function UploadTemplate() {

    const NumberGenerator = () => {
        var chars = '1234567890',
        serialLength = 9, randomSerial = "", i, randomNumber;
        for (i = 0; i < serialLength; i = i + 1) {
            randomNumber = Math.floor(Math.random() * chars.length);
            randomSerial += chars.substring(randomNumber, randomNumber + 1);
        }
        return randomSerial;
    }

    console.log(NumberGenerator());

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
        if (artType.trim() === '' || artPrice === '' || artDescription.trim() === '') {
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
            templateVersionID: NumberGenerator(),
            artType: artType,
            artPrice: artPrice,
            artDescription: artDescription, 
            artExURL: filename,
            postDate: date
        }

        console.log(requestBody);

        const address= process.env.REACT_APP_IP_ADDRESS + '/TemplateModify';
        //add post info to database
        axios.post(address, requestBody)
            .then((res) => {
            //console.log(res.data)
            setMessage('Upload Successful');
            setArtType('');
            setPrice(0);
            setArtDescription('');
        }).catch((error) => {
            //console.log(error)
            setMessage(error.message);
        });

        window.location.reload();
    }

    return (
        <div className="UploadTemp"> 
            <div className="form_container">
                <h1 className="form__title">Upload Artwork</h1>
    
                <div className="form__input-group">
                    <input list="artType" class="form__input" autoFocus placeholder="Artwork Type" 
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

                <div className="form__input-group">
                    <input type="text"class="form__input" autoFocus placeholder="Artwork Price" 
                    value={artPrice} onChange={event => setPrice(event.target.value)} /> <br/>
                    <div className="form__input-error-message"></div>
                </div>

                <div className="form__input-group">
                    <input type="text"class="form__input" autoFocus placeholder="Template Description" 
                    value={artDescription} onChange={event => setArtDescription(event.target.value)} /> <br/>
                    <div className="form__input-error-message"></div>
                </div>
    
                <div className='fileUpload'>
                    <input type="file" onChange={handleFileInput}/>
                </div>
    
                <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
      );
}

export default UploadTemplate;