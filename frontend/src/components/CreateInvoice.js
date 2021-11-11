import React, { useState } from 'react';
import axios from 'axios';
import NumberGenerator from '../functions/NumberGenerator';
import EmailVal from '../functions/EmailVal';
import '../styles/profile.scss';

function CreateInvoice() {
  
  const [artistEmail, setArtEmail] = useState('')
  const [customerEmail, setCusEmail] = useState('')
  const [prodCost, setProdCost] = useState(0)
  const [prodDesc, setProdDesc] = useState('')
  const [paymentType, setPayType] = useState('')
  const [message, setMessage] = useState(null);

  const submitForm = () => {
    //make sure all fields are populated
    if (EmailVal(artistEmail) === false || EmailVal(customerEmail) === false || prodDesc.trim() === '' || prodCost <= 0 || paymentType.trim() === '' || (paymentType !== 'Gallie' && paymentType !== 'Personal')) {
        var message = "All fields are required and valid\n";
        if(EmailVal(artistEmail) === false){
            message = message + "Invalid Artist Email\n";
        }
        if(EmailVal(customerEmail) === false){
            message = message + "Invalid Customer Email\n";
        }
        if(prodDesc.trim() === ''){
            message = message + "Invalid Product Desc\n";
        }
        if(prodCost <= 0){
            message = message + "Invalid Price\n";
        }
        console.log(paymentType);
        if(paymentType.trim() === '' || (paymentType !== 'Gallie' && paymentType !== 'Personal')){
            message = message + "Invalid Payment Type\n";
        }
        console.log(message);
        alert(message);
        return;
    }

    setMessage(null);

    //get the current date
    var date = new Date();

    const requestBody = {
        invoiceID: NumberGenerator(),
        artistEmail: artistEmail,
        customerEmail: customerEmail,
        prodCost: prodCost, 
        prodDesc: prodDesc,
        paymentType: paymentType,
        postDate: date
    }

    console.log(requestBody);

    axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckVariable', {
        params: { variableTable: 'Profile', variableName: 'email', variable: artistEmail, }
        })
        .then((res) => {
            console.log(res.data[0]["COUNT(1)"]);
            if(res.data[0]["COUNT(1)"]===1){
                //add post info to database
                axios.post(process.env.REACT_APP_IP_ADDRESS + '/CreateInvoice', requestBody)
                    .then((res) => {
                    //console.log(res.data)
                    alert('Submission Successful');
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
            else{
                alert('Invalid Artist Email');
                return;
            }
            }).catch((error) => {
                console.log(error);
            });
}

  return (
    <div align="center">
    <div className="profile">
        <div className="form_container">
            <h1 className="form__title">Invoice Form</h1>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="29" autoFocus placeholder="Email" 
                value={artistEmail} onChange={event => setArtEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="29" autoFocus placeholder="Customer Email" 
                value={customerEmail} onChange={event => setCusEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="number"class="form__input" min="29" max="1001" autoFocus placeholder="Product Cost" 
                value={prodCost} onChange={event => setProdCost(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="249" autoFocus placeholder="Product Description" 
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

            <button style={{marginTop: 20 + 'px'}} className="form__button" type="submit" onClick={submitForm}>Submit</button>
        </div>

        {message && <p className="message">{message}</p>}
    </div>
    </div>
  )
}

export default CreateInvoice;