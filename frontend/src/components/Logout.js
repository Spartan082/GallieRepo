// function Logout() {
//     return (
//       <div>
//         <h2>Logout</h2>  
//       </div>
//     );
//   }
  
//   export default Logout;
import '../styles/profile.scss';
import React from 'react';
import { getUser, resetUserSession } from './service/AuthService';

const Logout = (props) => {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    props.history.push('login');
  }
  return (
    <div>
      Hello {name}! You have been loggined in!!!! Welcome to the premium content. <br />
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  )
}

export default Logout;