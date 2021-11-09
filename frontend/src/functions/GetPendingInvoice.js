import "../styles/form.scss";
import {
  BrowserRouter as 
  Route,
  Link
} from "react-router-dom";
import ViewPendingDetails from "../components/ViewPendingDetails";
import ConvertTimestamp from "../functions/ConvertTimestamp";

function GetPendingInvoice({invoice}) {  
  return (<div className = "form">
        <table>
        <tr>
            <th>Invoice ID</th>
            <th>Customer Email</th>
            <th>Product Cost</th>
            <th>Date</th>
            <th>Review</th>
          </tr>
          { invoice.map(val => {
            return (
              <tr>
                <Route path="/ViewPendingDetails/:id" component={ViewPendingDetails} />
                <td><strong>{val.invoiceID}</strong></td>
                <td><strong>{val.customerEmail}</strong></td>
                <td><strong>${val.prodCost}</strong></td>
                <td><strong>{ConvertTimestamp(val.postDate)}</strong></td>
                <td><Link to={"/ViewPendingDetails/" + val.invoiceID}>Review</Link></td>
              </tr>
        )})}
        </table>
      </div>
    );
}

export default GetPendingInvoice;