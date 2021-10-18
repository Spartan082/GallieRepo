import React, { useState } from 'react';
import axios from 'axios';
import { NavLink} from "react-router-dom";



const registerUrl = 'https://pk3vioz5q4.execute-api.us-east-1.amazonaws.com/gallieprod3/register';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    
    if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
      setMessage('All fields are required');
      return;
    }
    //console.log('submit button is pressed!')
    setMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': '2tjbJfuJBWrpkvAUu5ax6lwdXKiYepG6yZhm9EJg'
      }
    }
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password
    }
    axios.post(registerUrl, requestBody, requestConfig).then(response => {
      setMessage('Registeration Successful');
    }).catch(error => {
      if (error.response.status === 401) {
        setMessage(error.response.data.message);
      } else {
        setMessage('sorry....the backend server is down!! please try again later');
      }
    })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1 class="form__title">Create Profile</h1>
          <div class="form__input-group">
                <input type="text" class="form__input" autofocus placeholder="Name" value={name} onChange={event => setName(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          <div class="form__input-group">
                <input type="text" class="form__input" autofocus placeholder="Email Address" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          <div class="form__input-group">
                <input type="text"class="form__input" autofocus placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          <div class="form__input-group">
                <input type="text"class="form__input" autofocus placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          {/* <div class="form__input-group"> */}
                {/* <input type="password" class="form__input" autofocus placeholder="Confirm password"> */}
                {/* <input type="password"class="form__input" autofocus placeholder="Confirm Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div> */}
          <button class="form__button" type="submit">Continue</button>
          <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/login">Already have a Profile? Sign in</NavLink>
          </p>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Register;