function GetRequest({request}) {  

    return (<ul>
        { request.map(val => {
          return (
            <ul>
              <li><strong>{val.requestID}</strong></li>
              <li><strong>{val.customerEmail}</strong></li>
              <li><strong>{val.artistUsername}</strong></li>
              <li><strong>{val.prodName}</strong></li>
              <li><strong>{val.initialPrice.toFixed(2)}</strong></li>
              <li><strong>{val.prodDesc}</strong></li>
            </ul>  
        )})}
      </ul>
    );
}

export default GetRequest;