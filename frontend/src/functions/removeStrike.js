import axios from 'axios'; 

async function removeStrike(profileID, reportID) {
    try{
        const strikes = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/GetNumStrikes', {
            params: { profileID: profileID, }});
        console.log(strikes.data[0].strikes);
        const stat = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/ViewSpecificReport', {
            params: { reportID: reportID, }});
        console.log(stat.data[0]);
        if(strikes.data[0].strikes > 0){
            await axios.put(process.env.REACT_APP_IP_ADDRESS + '/ChangeStrikes', {
                profileID: profileID,
                strikes: strikes.data[0].strikes - 1, 
            });
            console.log(strikes.data[0].strikes - 1);
            console.log(profileID);
        }
    }catch (err){
        console.log(err);
    }
}

export default removeStrike;