import ConvertTimestamp from "../functions/ConvertTimestamp";
import axios from 'axios';
import { Link } from "react-router-dom";

function GetPendingInvoiceDetails({details}) {  
    return (<div className = "form">
        { details.map(val => {
          const ChangeStatus = () => {
            axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckStatus', {
                params: { invoiceID: val.invoiceID, variable: val.paymentStatus, }
                })
                .then((res) => {
                    console.log(res.data[0].paymentStatus);
                    if(res.data[0].paymentStatus==='Pending'){
                        axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeStatus', {
                          invoiceID: val.invoiceID,
                          Status: 'Submitted'
                          })
                          .then(response => {
                            console.log(response);
                          })
                          .catch(error => {
                            console.log(error);
                          });
                        }
                    if(res.data[0].paymentStatus==='Submitted'){
                      axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeStatus', {
                        invoiceID: val.invoiceID,
                        Status: 'Pending'
                        })
                        .then(response => {
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                      }
                    }).catch((error) => {
                        console.log(error);
                    });
                  }

          return (
            <ul id= "double">
              <li><strong>Invoice ID:</strong></li>
              <li>{val.invoiceID}</li>
              <li><strong>Artist Email:</strong></li>
              <li>{val.artistEmail}</li>
              <li><strong>Customer Email:</strong></li>
              <li>{val.customerEmail}</li>
              <li><strong>Product Cost:</strong></li>
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
                    <Link className='goBack' to="/Pending Invoice"><button>Go Back</button></Link>
                    <Link className="resolve" to="/Pending Invoice"><button onClick={ChangeStatus}>Submit</button></Link>
                </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetPendingInvoiceDetails;