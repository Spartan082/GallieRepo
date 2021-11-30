import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetReqDetails from '../functions/GetRequestDetails'; 

function ViewRequestDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([])
console.log(id);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificRequest', {
      params: { requestID: id, }
      })
      .then((res) => {
          setDetails(res.data);
      })
    }, [])

    return (
      <div className = "section">
        {/* <p><Link to="/View Request"><button>Go Back</button></Link></p> */}
        <GetReqDetails details = {details} />
      </div>
    );
}

export default ViewRequestDetails;