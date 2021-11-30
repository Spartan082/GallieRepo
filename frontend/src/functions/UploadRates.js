import React, { useState,  } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'; 
import "../styles/createReport.scss";

function UploadRates(profileID) {

    const history = useHistory();

    const catagories = ['Icon', 'Sketch', 'Flat Color', 'Lineart', 'Shaded', 'Logo'];
    const [message, setMessage] = useState('If reporting a post, please put the artwork name in the description section.');

    const [rateType, setRateType] = useState('');
    const [ratePrice, setRatePrice] = useState(0);

  const setRates = (reportNum) => {
    if (reportNum === 1) {
        setRateType('icon');
    }
    else if (reportNum === 2) {
        setRateType('sketch');
    }
    else if (reportNum === 3) {
        setRateType('flatColor');
    }
    else if (reportNum === 4) {
        setRateType('lineart');
    }
    else if (reportNum === 5) {
        setRateType('shaded');
    }
    else if (reportNum === 6) {
        setRateType('logo');
    }
  }
  
  const submitForm = async () => {

    console.log(profileID.profileID);

    //make sure all fields are populated
    if (ratePrice <= 0 || (rateType !== 'icon' && rateType !== 'shaded' && 
        rateType !== 'lineart' && rateType !== 'flatcolor' && rateType !== 'sketch' && rateType !== 'logo')) {
      setMessage('All fields are required');
      return;
    }

    try{
        const check = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckVariable', {
            params: { variableTable: 'Artist', variableName: 'profileID', variable: profileID.profileID, }});
        console.log(check.data);
        if(check.data[0]["COUNT(1)"]===1){
            await axios.put(process.env.REACT_APP_IP_ADDRESS + '/UpdateRates', {
                profileID: profileID.profileID,
                catagory: rateType,
                price: ratePrice,
            })
            .then(response => {
                    console.log(response);
                    setMessage('Report Submitted Successfully');
                    setRatePrice(0);
                    setRateType('');
            })
            .catch(error => {
                console.log(error);
                setMessage("An Error Occured. Please Try Again.");
            })
        }
        else{
            const requestBody = {
                profileID: profileID.profileID,
                catagory: rateType,
                price: ratePrice,
            }
            console.log(requestBody);
            await axios.post(process.env.REACT_APP_IP_ADDRESS + '/UploadNewRates',  requestBody)
            .then(response => {
                    console.log(response);
                    setMessage('Report Submitted Successfully');
                    setRatePrice(0);
                    setRateType('');
            })
            .catch(error => {
                console.log(error);
                setMessage("An Error Occured. Please Try Again.");
            })
        }
    }catch (err){
        console.log(err);
    }
    history.push("/Rates");
  }

    return (
        <div align="center">
          <div className="profile"> 
           
              <div className="form_container">
                <h1 className="form__title">Add New Rate</h1>
    
                <div class="dropdown">
                  <div class="reportTypes">{rateType}</div>
                  <div class="dropdown-content">
                      <span className="option" onClick={() => setRates(1)}>{catagories[0]}</span>
                      <span className="option" onClick={() => setRates(2)}>{catagories[1]}</span>
                      <span className="option" onClick={() => setRates(3)}>{catagories[2]}</span>
                      <span className="option" onClick={() => setRates(4)}>{catagories[3]}</span>
                      <span className="option" onClick={() => setRates(5)}>{catagories[4]}</span>
                      <span className="option" onClick={() => setRates(6)}>{catagories[5]}</span>
                  </div>
                  <div className="extra-space"></div>
                </div>

                <div className="form__input-group">
                    <input type="number"class="form__input" min="29" max="1001" autoFocus placeholder="Rate" 
                    value={ratePrice} onChange={event => setRatePrice(event.target.value)} /> <br/>
                    <div className="form__input-error-message"></div>
                </div>
    
                <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
              </div>
            
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      );
  }
  
  export default UploadRates;