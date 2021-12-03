import '../styles/profile.scss';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavLink} from "react-router-dom";


const Login = (props) => {
  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const[loginStatus, setLoginStatus] = useState(''); 

  const submitForm = () => {
     
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    
    const requestBody = {
      username: username,
      password: password
    }

    console.log(requestBody);

  axios.post(process.env.REACT_APP_IP_ADDRESS + '/login', requestBody)
    .then((res) => {
      //console.log(res.data)
      console.log(res);
      if(res.data.message){
        console.log(res.data.message);
        setLoginStatus(res.data.message);
        if(res.data.loggedIn === true) {
          setLoginStatus(res.data.user[0].username);}
      }
      else{
        setLoginStatus(res.data[0].username);
      }
      //setErrorMessage('Login Successful');
    }).catch((error) => {
      //console.log(error)
      setErrorMessage(error.message);
    });

  } 

  useEffect(() => {
    axios.get(process.env.REACT_APP_IP_ADDRESS + '/login').then((res) => {
      console.log(res);
      if(res.data.loggedIn === true) {
      setLoginStatus(res.data.user[0].username);
  
      }
    });
  }, []);

  return (
    <div align="center">
    <div className="profile"> 
      {/* <form onSubmit={submitHandler}> */}
      <div class="form_container">
        <h1 class="form__title">Login</h1>
        <div class="form__message form__message--error"></div>
            <div class="form__input-group">
                <input type="text"  class="form__input" autoFocus placeholder="Username or email" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div>
            <div class="form__input-group">
                <input type="password" class="form__input" autoFocus placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div>
            <button class="form__button" type="submit" onClick={submitForm}>Continue</button>
      
      {errorMessage && <p className="message">{errorMessage}</p>}
      <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/forgot-password">Forgot your password?</NavLink>
            </p> 
            <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/Create Account">Don't have a Profile? Create Profile</NavLink>
            </p>
            </div>
      {/* </form> */}
    </div>

    <h1>{loginStatus}</h1>
    </div>
    
  )
}

export default Login;
  