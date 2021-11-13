import "../styles/form.scss";
import {
  BrowserRouter as 
  Route,
  Link
} from "react-router-dom";
import ViewReportDetails from "../components/ViewReportDetails";

function GetReport({reports}) {  
    console.log(reports);

    return (<div className = "form">
        <table>
        <tr>
            <th>Report ID</th>
            <th>Report Type</th>
            <th>Report Status</th>
            <th>Profile ID</th>
            <th>Review</th>
          </tr>
          { reports.map(val => {
            return (
              <tr>
                <Route path="/ViewReportDetails/:id" component={ViewReportDetails} />
                <td><strong>{val.reportID}</strong></td>
                <td><strong>{val.reportType}</strong></td>
                <td><strong>{val.reportStatus}</strong></td>
                <td><strong>{val.profileID}</strong></td>
                <td><Link to={"/ViewReportDetails/" + val.reportID}>Review</Link></td>
              </tr>
        )})}
        </table>
      </div>
    );
}

export default GetReport;