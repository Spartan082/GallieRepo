import React, { useState } from 'react';
import axios from 'axios';
import NumberGenerator from '../functions/NumberGenerator';
import EmailVal from '../functions/EmailVal';
import '../styles/profile.scss';

function CreateRequest() {
  
  const [customerEmail, setEmail] = useState('')
  const [artistUsername, setArtUser] = useState('')
  const [prodName, setProdName] = useState('')
  const [initialPrice, setInitialPrice] = useState(0)
  const [prodDesc, setProdDesc] = useState('')
  const [message, setMessage] = useState(null);

  const submitForm = () => {
    //make sure all fields are populated
    console.log(EmailVal(customerEmail));
    if (EmailVal(customerEmail) === false || artistUsername.trim() === '' || prodName.trim() === '' || prodDesc.trim() === '' || initialPrice <= 0) {
        var message = "All fields are required and valid\n";
        if(EmailVal(customerEmail) === false){
            message = message + "Invalid Email\n";
        }
        if(artistUsername.trim() === ''){
            message = message + "Invalid Username\n";
        }
        if(prodName.trim() === ''){
            message = message + "Invalid Product Name\n";
        }
        if(initialPrice <= 0){
            message = message + "Invalid Price\n";
        }
        console.log(message);
        alert(message);
        return;
    }

    setMessage(null);

    //get the current date
    var date = new Date();

    const requestBody = {
        requestID: NumberGenerator(),
        customerEmail: customerEmail,
        artistUsername: artistUsername,
        prodName: prodName, 
        initialPrice: initialPrice,
        prodDesc: prodDesc,
        postDate: date
    }

    console.log(requestBody);
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckVariable', {
        params: { variableTable: 'Profile', variableName: 'username', variable: artistUsername, }
        })
        .then((res) => {
            console.log(res.data[0]["COUNT(1)"]);
            if(res.data[0]["COUNT(1)"]===1){
                //add post info to database
                axios.post(process.env.REACT_APP_IP_ADDRESS + '/CreateRequest', requestBody)
                    .then((res) => {
                    //console.log(res.data)
                    alert('Submission Successful');
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
            else{
                alert('Invalid Username');
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
            <h1 className="form__title">Commission Form</h1>
            <div className="form__input-group">
                <input type="email" pattern=".+@globex\.com" class="form__input" size="29" autoFocus placeholder="Email" 
                value={customerEmail} onChange={event => setEmail(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="29" autoFocus placeholder="Artist Username" 
                value={artistUsername} onChange={event => setArtUser(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="29" autoFocus placeholder="Product Name" 
                value={prodName} onChange={event => setProdName(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="number"class="form__input" min="0" max="1001" autoFocus placeholder="Initial Price" 
                value={initialPrice} onChange={event => setInitialPrice(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text"class="form__input" maxlength="249" autoFocus placeholder="Product Description" 
                value={prodDesc} onChange={event => setProdDesc(event.target.value)} /> <br/>
                <div className="form__input-error-message"></div>
            </div>

            <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
        </div>
    </div>
    </div>
  )
}

export default CreateRequest;