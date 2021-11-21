import { Link, useHistory } from "react-router-dom";
import removeStrike from "../functions/removeStrike";
import axios from 'axios';
import ConvertTimestamp from "../functions/ConvertTimestamp";

function GetStrikedAccountDetails({details}) {  
    const history = useHistory();
    return (<div className = "form">
        { details.map(val => {
          const ChangeStrikeStatus = async () => {
            console.log(val);
            const check = window.confirm("Are you sure?");
            if (check === true) {
                if(val.reportStatus==='Striked') {
                    await axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeReportStatus', {
                        reportID: val.reportID,
                        Status: 'Resolved'
                    })
                    .then(response => {
                        console.log(response);
                        removeStrike(val.profileID, val.reportID);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                history.push("/ViewReportDetails/" + val.reportID);
            }else {
            console.log("Cancel");
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
                <li><strong>Date:</strong></li>
                <li>{ConvertTimestamp(val.postDate)}</li>
                <li><strong>Profile ID:</strong></li>
                <li>{val.profileID}</li>
                <ul id="buttons">
                  <Link className='goBack' to="/View Strike"><button>Go Back</button></Link>
                  <button style={{ marginRight: 3 + "%"}} onClick={ChangeStrikeStatus}>Remove</button>
                </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetStrikedAccountDetails;