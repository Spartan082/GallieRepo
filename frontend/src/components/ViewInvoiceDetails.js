import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetInvDetails from '../functions/GetInvoiceDetails'; 

function ViewInvoiceDetails() {
  const { id } = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificInvoice', {
      params: { invoiceID: id, }
      })
      .then((res) => {
          setInvoiceDetails(res.data);
      })
    }, [])

    return (
      <div className = "section">
        {/* <p><Link to="/View Invoice"><button>Go Back</button></Link></p> */}
        <GetInvDetails invoiceDetails = {invoiceDetails} />
      </div>
    );
}

export default ViewInvoiceDetails;