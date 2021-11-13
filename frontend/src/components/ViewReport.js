import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetReports from '../functions/GetReport';

function ViewReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewReport')
      .then((res) => {
          setReports(res.data);
      })
    }, []);

    return (
      <div className = "section">
        <h1>View Report</h1>
        <GetReports reports = {reports} />
      </div>
    );
  }
  
  export default ViewReport;
  