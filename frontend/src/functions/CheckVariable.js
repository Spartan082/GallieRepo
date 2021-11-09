import axios from 'axios';
function CheckVariable(variableTable, variableName, variable) {  
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckVariable', {
        params: { variableTable: variableTable, variableName: variableName, variable: variable, }
        })
        .then((res) => {
            console.log(res.data[0]["COUNT(1)"]);
            if(res.data[0]["COUNT(1)"]===1){
                return(1);
            }
            else{
                return(0);
            }
    }).catch((error) => {
    });
}
  
export default CheckVariable;