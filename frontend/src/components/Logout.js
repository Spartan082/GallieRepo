import '../styles/profile.scss';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/profile.scss';

function Logout (props) {
//const Logout = (props) => {
  axios.defaults.withCredentials = true;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginStatus, setLoginStatus] = useState(''); 
  const submitForm = () => {
    //check to see if user is logged in if they are set status to logout  
    axios.post(process.env.REACT_APP_IP_ADDRESS + '/logout')
    .then((res) => {
      //console.log(res.data)
      console.log(res);
      if(res.data.message){
        setLoginStatus(res.data.message);
        if(res.data.loggedIn === false) {
          setLoginStatus(null);} 
          setErrorMessage('Logout Successful');
        }
      else{
            setLoginStatus(null);
          }
      //setErrorMessage('Login Successful');
    }).catch((error) => {
      //console.log(error)
      setErrorMessage(error.message);
    });
     props.history.push('login');
     
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/logout').then((res) => {
      //console.log(res);
      if(res.data.loggedIn === false) {
      setLoginStatus(null);
      }
      return () =>loginStatus;
      // res.data.loggedIn = false;
    });
  }, );

  return (
    <div align="center">
    <div className="profile"> 
       <div class="form_container">
       <h1 class="form__title">Welcome to Gallie</h1>
      <h2 class="form__title">You are loggined in!  </h2>
      {/* <input  type="button" value="Logout" onClick={logoutHandler} /> */}
      <button class="form__button" type="submit" onClick={submitForm}>Logout</button>
    </div>
    </div>
    <h1>{loginStatus}</h1>
    </div>
  )
}


export default Logout;