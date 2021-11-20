import "../styles/form.scss";
import {
  BrowserRouter as 
  Route,
  Link
} from "react-router-dom";
import ViewAccountStrikeDetails from "../components/ViewAccountStrikeDetails";

function GetRequest({account}) {  
    return (<div className = "form">
        <table>
        <tr>
            <th>Profile ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Strikes</th>
            <th>Review</th>
          </tr>
          { account.map(val => {
            return (
              <tr>
                <Route path="/ViewAccountStrikeDetails/:id" component={ViewAccountStrikeDetails} />
                <td><strong>{val.requestID}</strong></td>
                <td><strong>{val.customerEmail}</strong></td>
                <td><strong>{val.prodName}</strong></td>
                <td><strong>{val.postDate}</strong></td>
                <td><Link to={"/ViewAccountStrikedDetails/" + val.requestID}>Review</Link></td>
              </tr>
        )})}
        </table>
      </div>
    );
}

export default GetRequest;