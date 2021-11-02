import React, { useState } from 'react';
import axios from 'axios';
import NumberGenerator from '../functions/NumberGenerator';

function CreateRequest() {
  
  const [artistEmail, setArtEmail] = useState([])
  const [customerEmail, setCusEmail] = useState([])
  const [prodCost, setProdCost] = useState(0)
  const [prodDesc, setProdDesc] = useState([])
  const [paymentType, setPayType] = useState([])
  const [message, setMessage] = useState(null);

  const submitForm = () => {
    //make sure all fields are populated
    if (artistEmail.trim() === '' || customerEmail === '' || prodDesc.trim() === '' || prodCost <= 0) {
        setMessage('All fields are required');
        return;
    }

    setMessage(null);

    const requestBody = {
        invoiceID: NumberGenerator(),
        artistEmail: artistEmail,
        customerEmail: customerEmail,
        prodCost: prodCost, 
        prodDesc: prodDesc,
        paymentType: paymentType
    }

    console.log(requestBody);

    //add post info to database
    axios.post('http://localhost:8000/CreateInvoice', requestBody)
        .then((res) => {
        //console.log(res.data)
        setMessage('Submission Successful');
        setArtEmail('');
        setCusEmail('');
        setProdCost(0);
        setProdDesc('');
        setPayType('');
    }).catch((error) => {
        //console.log(error)
        setMessage(error.message);
    });
}

  return (
    <div className="UploadComm"> 
        <div className="form_container">
            <h1 className="form__title">Invoice Form</h1>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Email" 
                value={artistEmail} onChange={event => setArtEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Customer Email" 
                value={customerEmail} onChange={event => setCusEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="number"class="form__input" autoFocus placeholder="Product Cost" 
                value={prodCost} onChange={event => setProdCost(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Product Description" 
                value={prodDesc} onChange={event => setProdDesc(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input list="paymentType" class="form__input" autoFocus placeholder="Payment Type" 
                onChange={event => setPayType(event.target.value)} />
                <datalist id ="paymentType">
                    <option value="Gallie"></option>
                    <option value="Personal"></option>
                </datalist>
                <div className="form__input-error-message"></div>
            </div>
            <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
        </div>

        {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateRequest;