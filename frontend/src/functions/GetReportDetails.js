import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import addStrike from "../functions/addStrike";
import removeStrike from "../functions/removeStrike";

function GetReportDetails({details}) {
    const history = useHistory();
    return (<div className = "form">
        { details.map(val => {
            const ChangeReportStatus = async () => {
                console.log(val);
                const check = window.confirm("Are you sure?");
                if (check === true) {
                    if(val.reportStatus==='Pending' || val.reportStatus==='Striked') {
                        await axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeReportStatus', {
                            reportID: val.reportID,
                            Status: 'Resolved'
                        })
                        .then(response => {
                            console.log(response);
                            if(val.reportStatus==='Striked'){
                                removeStrike(val.profileID, val.reportID);
                                history.push("/View Report");
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                }else {
                console.log("Cancel");
            }
            }

            const newStrike = async () => {
                const check = window.confirm("Are you sure?");
                if (check === true) {
                    console.log("Ok");
                    await addStrike(val.profileID, val.reportID);
                    history.push("/View Report");
                } else {
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
                <li><strong>Profile ID:</strong></li>
                <li>{val.profileID}</li>
                <ul id="buttons">
                    <Link className='goBack' to="/View Report"><button>Go Back</button></Link>
                    <button onClick={newStrike}>Add Strike</button>
                    <button style={{ marginRight: 3 + "%"}} onClick={ChangeReportStatus}>Resolve</button>
                </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetReportDetails;