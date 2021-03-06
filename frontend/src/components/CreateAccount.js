import '../styles/profile.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink} from "react-router-dom";
import NumberGenerator from '../functions/NumberGenerator';



const CreateAccount = () => {
  const [profileID, setprofileID] = useState('');
  //const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState(null);


    const submitForm = () => {
     
    if ( email.trim() === '' || username.trim() === '' ||  password.trim() === '') {
      setMessage('All fields are required');
      return;
    }
    //console.log('submit button is pressed!')
    setMessage(null);
  
    const requestBody = {
      profileID: NumberGenerator(),
      email: email,
      username: username.toLowerCase().trim(),
      password: password, //encryptedPW
      status: 'Artist'
    }
    console.log(requestBody);

   //add post info to database
   axios.post(process.env.REACT_APP_IP_ADDRESS + '/register', requestBody)
   .then((res) => { 
     //console.log(res.data)
     setMessage('Registration Successful');
     setprofileID(''); 
     setEmail('');
     setUsername('');
     setPassword('');
     setStatus('');
   }).catch((error) => {
     //console.log(error)
     setMessage(error.message);
   });
}

  return (
    <div align="center">
    <div className="profile"> 
      {/* <form onSubmit={submitHandler}> */}
      <div class="form_container">
        <h1 class="form__title">Create Profile</h1>
          {/* <div class="form__input-group">
                <input type="text" class="form__input" autofocus placeholder="Name" value={name} onChange={event => setName(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div> */}
          <div class="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          <div class="form__input-group">
                <input type="text" class="form__input" autoFocus placeholder="Email Address" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          <div class="form__input-group">
                <input type="text"class="form__input" autoFocus placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
          </div>
          {/* <div class="form__input-group"> */}
                {/* <input type="password" class="form__input" autofocus placeholder="Confirm password"> */}
                {/* <input type="password"class="form__input" autofocus placeholder="Confirm Password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <div class="form__input-error-message"></div>
            </div> */}
          <button class="form__button" type="submit" onClick={submitForm}>Continue</button>
          <p class="form__text">
                <NavLink class="form__link" activeClassName="active" to="/login">Already have a Profile? Sign in</NavLink>
          </p>
          </div>
      {/* </form> */}
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  )
}

export default CreateAccount;