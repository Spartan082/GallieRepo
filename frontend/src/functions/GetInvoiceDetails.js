import ConvertTimestamp from "../functions/ConvertTimestamp";
import { Link } from "react-router-dom";

function GetInvoiceDetails({invoiceDetails}) {  

    return (<div className = "form">
        { invoiceDetails.map(val => {
          return (
            <ul id= "double">
              <li><strong>Invoice ID:</strong></li>
              <li>{val.invoiceID}</li>
              <li><strong>Artist Email:</strong></li>
              <li>{val.artistEmail}</li>
              <li><strong>Customer Email:</strong></li>
              <li>{val.customerEmail}</li>
              <li><strong>$Product Cost:</strong></li>
              <li>${val.prodCost.toFixed(2)}</li>
              <li><strong>Product Description:</strong></li>
              <li>{val.prodDesc}</li>
              <li><strong>Payment Type:</strong></li>
              <li>{val.paymentType}</li>
              <li><strong>Payment Status:</strong></li>
              <li>{val.paymentStatus}</li>
              <li><strong>Date:</strong></li>
              <li>{ConvertTimestamp(val.postDate)}</li>
              <ul id="buttons">
                    <Link className='goBack' to="/View Invoice"><button>Go Back</button></Link>
              </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetInvoiceDetails;