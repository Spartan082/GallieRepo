import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetInvoice from '../functions/GetInvoice';

function ViewInvoice() {
  const [invoice, setInvoice] = useState([]);

  const [message, setMessage] = useState('');

  const getInitialArtistInvoices = (artistEmail) => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewInvoice', {
      params: { email: artistEmail }
      })
      .then((res) => {
          if (res.data.length === 0) {
            setMessage('No Invoices')
          }
          setInvoice(res.data);
      })
  }

  const getInitialAllInvoices = () => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewAllInvoices')
      .then((res) => {
          if (res.data.length === 0) {
            setMessage('No Invoices')
          }
          setInvoice(res.data);
      })
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/login')
      .then((res) => {
        console.log(res.data)
         //if user is logged in set the profileId
        if (res.data.loggedIn === true && res.data.user[0].status === 'Artist')
        {
          getInitialArtistInvoices(res.data.user[0].email);
        }
        else if (res.data.loggedIn === true && res.data.user[0].status === 'Moderator') {
          getInitialAllInvoices();
        }
        else {
          setMessage('Please login to view invoices');
        }
      }).catch((error) => {
        console.log(error)
        setMessage("There was an error loading invoices. Please try again.")
      });
  }, []);

    return (
      <div className = "section">
        <h1>View Invoice</h1>
        <GetInvoice invoice = {invoice} />
        {message && <p className="message">{message}</p>}
      </div>
    );
}

export default ViewInvoice;