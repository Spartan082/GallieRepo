import axios from 'axios'; 

async function addStrike(profileID, reportID) {
    try{
        const strikes = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/GetNumStrikes', {
            params: { profileID: profileID, }});
        console.log(strikes.data[0].strikes);
        const stat = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificReport', {
            params: { reportID: reportID, }});
        console.log(stat.data[0]);
        if(stat.data[0].reportStatus!=='Striked'){
            await axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeReportStatus', {
                reportID: reportID,
                Status: 'Striked'
            });
            await axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeStrikes', {
                profileID: profileID,
                strikes: strikes.data[0].strikes + 1, 
            });
            if((strikes.data[0].strikes + 1)>=3){
                window.alert("This account has exceeded strike limit and needs to be reviewed");
            }
            return; 
        }
        else{
            window.alert("This report has already resulted in a strike.");
            return;
        }
    }catch (err){
        console.log(err);
    }
}

export default addStrike;