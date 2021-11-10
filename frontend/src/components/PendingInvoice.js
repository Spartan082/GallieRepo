import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetInvoice from '../functions/GetPendingInvoice';
  
function PendingInvoice() {
  const [invoice, setInvoice] = useState([])
  
  useEffect(() => {
    axios
        .get(process.env.REACT_APP_IP_ADDRESS + '/ViewPendingInvoice')
        .then(response => {
            setInvoice(response.data)
        })
  }, [])
  
  return (
    <div className = "section">
      <h1>View Pending Invoice</h1>
      <GetInvoice invoice = {invoice} />
    </div>
   );
}
  
  export default PendingInvoice;