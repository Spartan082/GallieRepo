import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetRequest from '../functions/GetRequest';

function ViewRequest() {
  const [request, setRequest] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewRequest', {
      params: { artistUsername: 'ConnorR', }
      })
      .then((res) => {
          setRequest(res.data);
      })
    }, [])

    return (
      <div className = "section">
        <h1>View Request</h1>
        <GetRequest request = {request} />
      </div>
    );
}

export default ViewRequest;