import React, { useState } from 'react';
import axios from 'axios';

const forgotPasswordUrl = 'https://pk3vioz5q4.execute-api.us-east-1.amazonaws.com/gallieprod3/forgotPassoword';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
  
    const submitHandler = (event) => {
      event.preventDefault();
      
      if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
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
        password: password
      }
      axios.post(forgotPasswordUrl, requestBody, requestConfig).then(response => {
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
      <div align="center">
      <div className="profile"> 
        <form onSubmit={submitHandler}>
        <div class="form_container">
          <h1 class="form__title">Forgot Password</h1>
      <div class="form__message form__message--error"></div>
        <div class="form__input-group">
            <input type="text" class="form__input" autofocus placeholder="Email Address" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
            <div class="form__input-error-message"></div>
        </div>
        <button class="form__button" type="submit">Send Confirmation</button>
        </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      </div>
    )
  }


export default ForgotPassword;