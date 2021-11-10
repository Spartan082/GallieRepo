import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetInvoice from '../functions/GetInvoice';

function ViewInvoice() {
  const [invoice, setInvoice] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewInvoice', {
      params: { email: 'connorscottruch@gmail.com', }
      })
      .then((res) => {
          setInvoice(res.data);
      })
    }, [])

    return (
      <div className = "section">
        <h1>View Invoice</h1>
        <GetInvoice invoice = {invoice} />
      </div>
    );
}

export default ViewInvoice;