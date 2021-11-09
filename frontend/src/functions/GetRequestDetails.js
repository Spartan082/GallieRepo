import ConvertTimestamp from "../functions/ConvertTimestamp";

function GetRequestDetails({details}) {  

    return (<div className = "form">
        { details.map(val => {
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
            </ul>   
        )})}
      </div>
    );
}

export default GetRequestDetails;