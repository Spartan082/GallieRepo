function ConvertTimestamp(timestamp) {  
    console.log(timestamp);
    var date = new Date(timestamp);
    var current = (date.getMonth()+1)+
          "/"+date.getDate()+
          "/"+date.getFullYear();
    return current;
}
  
export default ConvertTimestamp;