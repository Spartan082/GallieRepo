import axios from 'axios';
import { Link } from "react-router-dom";

function GetReportDetails({details}) {  
    return (<div className = "form">
        { details.map(val => {
            const ChangeReportStatus = () => {
                console.log(val);
                if(val.reportStatus==='Pending') {
                    axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeReportStatus', {
                        reportID: val.reportID,
                        Status: 'Resolved'
                    })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            }
          return (
            <ul id= "double">
                <li><strong>Report ID:</strong></li>
                <li>{val.reportID}</li>
                <li><strong>Report Type:</strong></li>
                <li>{val.reportType}</li>
                <li><strong>Report Details:</strong></li>
                <li>{val.reportDetails}</li>
                <li><strong>Report Description:</strong></li>
                <li>{val.reportDesc}</li>
                <li><strong>Report Status:</strong></li>
                <li>{val.reportStatus}</li>
                <li><strong>Profile ID:</strong></li>
                <li>{val.profileID}</li>
                <ul id="buttons">
                    <Link className='goBack' to="/View Report"><button>Go Back</button></Link>
                    <Link className='resolve' to="/View Report"><button onClick={ChangeReportStatus}>Resolve</button></Link>
                </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetReportDetails;