import ConvertTimestamp from "../functions/ConvertTimestamp";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

function GetRequestDetails({details}) { 
    const history = useHistory();
    return (<div className = "form">
        { details.map(val => {
          const remove = () => {
            axios.delete(process.env.REACT_APP_IP_ADDRESS + '/RemoveRequest', 
              { data : {  requestID: val.requestID, }})
            .then((res) => { console.log(res.data);
            }).catch((error) => { console.log(error); });
          
            history.push("/View Request");
          }

          return (
            <ul id= "double">
              <li><strong>Request ID:</strong></li>
              <li>{val.requestID}</li>
              <li><strong>Customer Email:</strong></li>
              <li>{val.customerEmail}</li>
              <li><strong>Product Name:</strong></li>
              <li>{val.prodName}</li>
              <li><strong>Initial Price:</strong></li>
              <li>${val.initialPrice.toFixed(2)}</li>
              <li><strong>Product Description:</strong></li>
              <li>{val.prodDesc}</li>
              <li><strong>Date:</strong></li>
              <li>{ConvertTimestamp(val.postDate)}</li>
              <ul id="buttons">
                    <Link className='goBack' to="/View Request"><button>Go Back</button></Link>
                    <button style={{ marginRight: 3 + "%"}} className="resolve" onClick={remove}>Remove</button>
                </ul>
            </ul>   
        )})}
      </div>
    );
}

export default GetRequestDetails;