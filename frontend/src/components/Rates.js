import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import UploadRates from "../functions/UploadRates";
import RatesInfo from "../functions/RatesInfo";
import RatesLook from "../functions/RatesLook";

function Rates() {

  const profileID = '031771111';

  const [rates, setRates] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_IP_ADDRESS + '/ViewArtistRates', {
        params: { profileID: profileID }
        })
        .then((res) => {
            setRates(res.data);
        }).catch((error) => {
        console.log(error)
        });
    }, []);

  const [showForm, setShowForm] = useState(false);
  const [showRates, setShowRates] = useState(false);
  const [showlook, setShowlook] = useState(false);

  const reset = () => {
    setShowForm(false);
    setShowRates(false);
    setShowlook(false);
  }

  const FormOnClick = () => {
    if(showForm === true){
      setShowForm(!showForm);
    }
    else{
      reset(); 
      setShowForm(!showForm);
    }
  }

  const RatesOnClick = () => {
    if(showRates === true){
      setShowRates(!showRates);
    }
    else{
      reset(); 
      setShowRates(!showRates);
    }
  }

  const LookOnClick = () => {
    if(showForm === true){
      setShowlook(!showlook);
    }
    else{
      reset(); 
      setShowlook(!showlook);
    }
  }

  return (
    <div className = "section">
    <h1>Creating Artist Rate Template</h1>
    <div>
      <div className = "rates">
        <ul>
          <li><button onClick={FormOnClick}>Add Rates</button></li>
          <li><button onClick={RatesOnClick}>View Rates</button></li>
          <li><button onClick={LookOnClick}>Look Up Rates</button></li>
        </ul>
      </div>
      <div>
        {showForm ? <UploadRates profileID = {profileID} /> : null}
        {showRates ? <RatesInfo rates = {rates} /> : null}
        {showlook ? <RatesLook/> : null}
      </div>
    </div>
    </div>
    );
  }
  
export default Rates;
  