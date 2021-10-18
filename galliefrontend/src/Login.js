import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService'
import { NavLink} from "react-router-dom";



const loginAPIUrl = 'https://pk3vioz5q4.execute-api.us-east-1.amazonaws.com/gallieprod3/login';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    //console.log('login button pressed')
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': '2tjbJfuJBWrpkvAUu5ax6lwdXKiYepG6yZhm9EJg'
      }
    }
    const requestBody = {
      username: username,
      password: password
    }

    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      props.history.push('/premium-content');
    }).catch((error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!');
      }
    })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1 class="form__title">Login</h1>
        <div class="form__message form__message--error"></div>
            <div class="form__input-group">
                <input type="text"  class="form__input" autofocus placeholder="Username or email" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div>
            <div class="form__input-group">
                <input type="password" class="form__input" autofocus placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div>
            <button class="form__button" type="submit">Continue</button>
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
      <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/forgot-password">Forgot your password?</NavLink>
            </p> 
            <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/register">Don't have a Profile? Create Profile</NavLink>
            </p>
    </div>
  )
}

export default Login;