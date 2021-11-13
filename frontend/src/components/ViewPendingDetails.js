import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetPenDetails from '../functions/GetPendingInvoiceDetails'; 

function ViewPendingDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificInvoice', {
      params: { invoiceID: id, }
      })
      .then((res) => {
          setDetails(res.data);
      })
    }, [])

    console.log(details);

    return (
      <div className = "section">
        {/* <p><Link to="/Pending Invoice"><button>Go Back</button></Link></p> */}
        <GetPenDetails details = {details} />
      </div>
    );
}

export default ViewPendingDetails;