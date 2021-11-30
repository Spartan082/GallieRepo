import React, { useState } from 'react';
import axios from 'axios'; 
import RemoveAllArt from '../functions/RemoveAllArt'; 

function RemoveProfile() {
    const [username, setUsername] = useState('');
    const [profileID, setProfile] = useState('');
    const [message, setMessage] = useState(null);
    const [posts, setProPosts] = useState([]);
      
    const submitForm = async () => {
        setMessage('');
        //make sure all fields are populated
        if (username.trim() === '') {
            setMessage('All fields are required');
            return;
        }
        try{
            const check = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/CheckVariable', {
                params: { variableTable: 'Profile', variableName: 'username', variable: username, }});
            console.log(check.data);
            if(check.data[0]["COUNT(1)"]===1){
                const profile = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/profileByUsername', {
                    params: { username: username, }});
                console.log(profile.data[0].profileID);
                const posts = await axios.get(process.env.REACT_APP_IP_ADDRESS + '/GetProfilePosts', {
                    params: { profileID: profile.data[0].profileID, }});
                console.log(posts.data);
                RemoveAllArt(posts.data);
                const del = await axios.delete(process.env.REACT_APP_IP_ADDRESS + '/RemoveProfile', 
                { data : 
                  {  
                    profileID: profile.data[0].profileID,
                  }
                })
                console.log(del);
            }
            else{
                setMessage('Invalid Username');
                return;
            }
        }catch (err){
            console.log(err);
        }
    }

  return (
    <div align="center">
      <div className="profile"> 
       
          <div className="form_container">
            <h1 className="form__title">Remove Profile</h1>

            <div className="form__input-group">
              <input type="text"class="form__input" autoFocus placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
              <div className="form__input-error-message"></div>
            </div>

            <button className="form__button" type="submit" onClick={submitForm}>Remove</button>
          </div>
        
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
  
export default RemoveProfile;
  