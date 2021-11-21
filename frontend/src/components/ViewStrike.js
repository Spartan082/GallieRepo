import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetStrikedAccounts from '../functions/GetStrikedAccounts.js';

function ViewStrike() {

  const [account, setAccount] = useState([]);
  const [message, setMessage] = useState('');    

  useEffect(() => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/ViewAllStrikedAccounts')
      .then((res) => {
      if (res.data.length === 0) {
        setMessage('No Accounts');
      }
        setAccount(res.data);
    })
    }, []);

  return (
    <div className = "section">
      <h1>View Strikes</h1>
      <GetStrikedAccounts account = {account} />
        {message && <p className="message">{message}</p>}
    </div>
  );
  }
  
  export default ViewStrike;
  