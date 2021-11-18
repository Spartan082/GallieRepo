import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetRequest from '../functions/GetRequest';
import GetRequestDetails from '../functions/GetRequestDetails';

function ViewRequest() {
  const [request, setRequest] = useState([])
  const [message, setMessage] = useState('');

  const getInitialArtistRequests = (username) => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewRequest', {
      params: { artistUsername: username, }
      })
      .then((res) => {
          if (res.data.length === 0) {
            setMessage('No Requests')
          }
          setRequest(res.data);
      })
  }

  const getInitialAllRequests = () => {
    axios
      .get(process.env.REACT_APP_IP_ADDRESS + '/ViewAllRequest')
      .then((res) => {
          if (res.data.length === 0) {
            setMessage('No Requests')
          }
          setRequest(res.data);
      })
  }
    
  useEffect(() => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/login')
      .then((res) => {
        console.log(res.data)
         //if user is logged in set the profileId
        if (res.data.loggedIn === true && res.data.user[0].status === 'Artist')
        {
          getInitialArtistRequests(res.data.user[0].username);
        }
        else if (res.data.loggedIn === true && res.data.user[0].status === 'Moderator') {
          getInitialAllRequests();
        }
        else {
          setMessage('Please login to view requests');
        }
      }).catch((error) => {
        console.log(error)
        setMessage("There was an error loading requests. Please try again.")
      });
  }, []);

    return (
      <div className = "section">
        <h1>View Request</h1>
        <GetRequest request = {request} />
        {message && <p className="message">{message}</p>}
      </div>
    );
}

export default ViewRequest;