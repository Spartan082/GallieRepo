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
                <td><strong>{val.profileID}</strong></td>
                <td><strong>{val.username}</strong></td>
                <td><strong>{val.email}</strong></td>
                <td><strong>{val.strikes}</strong></td>
                <td><Link to={"/ViewAccountStrikeDetails/" + val.profileID}>Review</Link></td>
              </tr>
        )})}
        </table>
      </div>
    );
}

export default GetRequest;