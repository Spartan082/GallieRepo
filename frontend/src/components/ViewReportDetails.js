import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetRepDetails from '../functions/GetReportDetails'; 

function ViewReportDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificReport', {
      params: { reportID: id, }
      })
      .then((res) => {
          setDetails(res.data);
      })
    }, [])

    return (
      <div className = "section">
        {/* <p><Link to="/View Report"><button>Go Back</button></Link></p> */}
        <GetRepDetails details = {details} />
      </div>
    );
}

export default ViewReportDetails;