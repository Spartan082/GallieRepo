import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetStrAccDetails from '../functions/GetStrikedAccountDetails'; 

function ViewAccountStrikeDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios
        .get(process.env.REACT_APP_IP_ADDRESS + '/ViewStrikedReports', {
            params: { profileID: id, }})
        .then((res) => {
            setDetails(res.data);
        })
    }, []);

    console.log(details);

    return (
      <div className = "section">
        {/* <p><Link to="/View Request"><button>Go Back</button></Link></p> */}
        <GetStrAccDetails details = {details} />
      </div>
    );
}

export default ViewAccountStrikeDetails;