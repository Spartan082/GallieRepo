import React, { useState } from 'react';
import axios from 'axios'; 
import "../styles/createReport.scss";
import NumberGenerator from '../functions/NumberGenerator';

function CreateReport() {

  const [artistName, setArtistName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('If reporting a post, please put the artwork name in the description section.');

  const [reportType, setReportType] = useState('');
  const [reportDetails, setReportDetails] = useState('Select Report Type');

  const abuseReportType = "Abuse, harassment, or threatening behavior";
  const impersonatingReportType = "Impersonating or imitating another person";
  const offensiveReportType = "Pornographic, offensive, profane, or obscene";
  const spamReportType = "Spam";

  const setReports = (reportNum) => {
    if (reportNum === 1) {
      setReportType('Misconduct');
      setReportDetails(abuseReportType);
    }
    else if (reportNum === 2) {
      setReportType('Misrepresentation');
      setReportDetails(impersonatingReportType);
    }
    else if (reportNum === 3) {
      setReportType('Public Indecency');
      setReportDetails(offensiveReportType);
    }
    else if (reportNum === 4) {
      setReportType(spamReportType);
      setReportDetails(spamReportType);
    }
  }

  //get the current date
  var date = new Date();
  
  const submitReport  = (profileID) => {
    const requestBody = {
      reportID: NumberGenerator(),
      reportType: reportType,
      reportDetails: reportDetails,
      reportDesc: description,
      reportStatus: 'Pending',
      date: date,
      profileId: profileID
    }

    //console.log(requestBody);

    //add report info to database
    axios.post(process.env.REACT_APP_IP_ADDRESS + '/uploadReport', requestBody)
      .then((res) => {
        //console.log(res.data)
        setMessage('Report Submitted Successfully');
        setArtistName('');
        setDescription('');
        setReportDetails('Select Report Type');
      }).catch((error) => {
        //console.log(error)
        setMessage(error.message);
      });
  }

  const submitForm = () => {

    //make sure all fields are populated
    if (artistName.trim() === '' || description.trim() === '' || reportDetails === 'Select Report Type') {
      setMessage('All fields are required');
      return;
    }

    //make sure all fields do not exceed maximum length
    if(artistName.length > 29)
    {
      setMessage('Artist Username is too long. Maximum length is 29 characters.');
      return;
    }
    else if (description.length > 249)
    {
      setMessage('Description of Violation is too long. Maximum length is 249 characters.');
      return;
    }

    console.log(artistName);
     //add post info to database
     axios.get(process.env.REACT_APP_IP_ADDRESS + '/profileByUsername',  {
      params: {
          username: artistName,
      }})
     .then((res) => {
       console.log(res.data);
       if (res.data.length !== 0) {
        submitReport(res.data[0].profileID);
      }
      else {
        setArtistName('');
        setMessage('Artist Username Not Found');
      }
     }).catch((error) => {
       console.log(error)
       setMessage("An Error Occured. Please Try Again.");
     });
  
  }

  return (
    <div align="center">
      <div className="profile"> 
       
          <div className="form_container">
            <h1 className="form__title">Create Report</h1>

            <div className="form__input-group">
              <input type="text"class="form__input" autoFocus placeholder="Artist Username" value={artistName} onChange={event => setArtistName(event.target.value)} /> <br/>
              <div className="form__input-error-message"></div>
            </div>

            <div class="dropdown">
              <div class="reportTypes">{reportDetails}</div>
              <div class="dropdown-content">
                  <span className="option" onClick={() => setReports(1)}>{abuseReportType}</span>
                  <span className="option" onClick={() => setReports(2)}>{impersonatingReportType}</span>
                  <span className="option" onClick={() => setReports(3)}>{offensiveReportType}</span>
                  <span className="option" onClick={() => setReports(4)}>{spamReportType}</span>
              </div>
              <div className="extra-space"></div>
            </div>

            <div className="form__input-group">
              <input type="text" class="form__input" autoFocus placeholder="Description of Violation" value={description} onChange={event => setDescription(event.target.value)} /> <br/>
              <div className="form__input-error-message"></div>
            </div>

            <button className="form__button" type="submit" onClick={submitForm}>Submit</button>
          </div>
        
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
  }
  
  export default CreateReport;
  