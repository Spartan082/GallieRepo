function RatesInfo(rates) {

    console.log(rates.rates[0].profileID);     

    return (
        <div className = "form">
            <ul id= "double">
              <li><strong>Icon:</strong></li>
              <li>${rates.rates[0].icon.toFixed(2)}</li>
              <li><strong>Sketch:</strong></li>
              <li>${rates.rates[0].sketch.toFixed(2)}</li>
              <li><strong>Flat Color:</strong></li>
              <li>${rates.rates[0].flatColor.toFixed(2)}</li>
              <li><strong>Lineart:</strong></li>
              <li>${rates.rates[0].lineart.toFixed(2)}</li>
              <li><strong>Shaded:</strong></li>
              <li>${rates.rates[0].shaded.toFixed(2)}</li>
              <li><strong>Logo:</strong></li>
              <li>${rates.rates[0].logo.toFixed(2)}</li>
            </ul>
      </div>
    );
  }
  
  export default RatesInfo;