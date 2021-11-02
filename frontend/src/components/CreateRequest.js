import React, { useState } from 'react';
import axios from 'axios';
import NumberGenerator from '../functions/NumberGenerator';

function CreateRequest() {
  
  const [customerEmail, setEmail] = useState([])
  const [artistUsername, setArtUser] = useState([])
  const [prodName, setProdName] = useState([])
  const [initialPrice, setInitialPrice] = useState(0)
  const [prodDesc, setProdDesc] = useState([])
  const [message, setMessage] = useState(null);

  const submitForm = () => {
    //make sure all fields are populated
    if (customerEmail.trim() === '' || artistUsername === '' || prodName.trim() === '' || prodDesc.trim() === '' || initialPrice <= 0) {
        setMessage('All fields are required');
        return;
    }

    setMessage(null);

    const requestBody = {
        requestID: NumberGenerator(),
        customerEmail: customerEmail,
        artistUsername: artistUsername,
        prodName: prodName, 
        initialPrice: initialPrice,
        prodDesc: prodDesc
    }

    console.log(requestBody);

    //add post info to database
    axios.post('http://localhost:8000/CreateRequest', requestBody)
        .then((res) => {
        //console.log(res.data)
        setMessage('Submission Successful');
        setEmail('');
        setArtUser('');
        setInitialPrice(0);
        setProdDesc('');
        setProdName('');
    }).catch((error) => {
        //console.log(error)
        setMessage(error.message);
    });
}

  return (
    <div className="UploadComm"> 
        <div className="form_container">
            <h1 className="form__title">Commission Form</h1>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Email" 
                value={customerEmail} onChange={event => setEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Artist Username" 
                value={artistUsername} onChange={event => setArtUser(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Product Name" 
                value={prodName} onChange={event => setProdName(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="number"class="form__input" autoFocus placeholder="Initial Price" 
                value={initialPrice} onChange={event => setInitialPrice(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Product Description" 
                value={prodDesc} onChange={event => setProdDesc(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>

            <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
        </div>

        {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateRequest;