import "../styles/form.scss";
import {
  BrowserRouter as 
  Route,
  Link
} from "react-router-dom";
import ViewRequestDetails from "../components/ViewRequestDetails";
import ConvertTimestamp from "../functions/ConvertTimestamp";

function GetRequest({request}) {  
    return (<div className = "form">
        <table>
        <tr>
            <th>Request ID</th>
            <th>Email</th>
            <th>Product Name</th>
            <th>Date</th>
            <th>Review</th>
          </tr>
          { request.map(val => {
            return (
              <tr>
                <Route path="/ViewRequestDetails/:id" component={ViewRequestDetails} />
                <td><strong>{val.requestID}</strong></td>
                <td><strong>{val.customerEmail}</strong></td>
                <td><strong>{val.prodName}</strong></td>
                <td><strong>{ConvertTimestamp(val.postDate)}</strong></td>
                <td><Link to={"/ViewRequestDetails/" + val.requestID}>Review</Link></td>
              </tr>
        )})}
        </table>
      </div>
    );
}

export default GetRequest;