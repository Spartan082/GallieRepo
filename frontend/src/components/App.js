import '../styles/App.scss';
import "../styles/homepage.scss";
import Homepage from "./Homepage.js";
import Menu from "./Menu.js";
import React, { useState, useEffect }  from 'react';
import Commission from "./Commission";
import Template from "./Template";
import Profile from "./Profile";
import Message from "./Message";
import Invoices from "./Invoices";
import Management from "./Management";
import Request from "./CreateReport";
import VRequest from "./ViewRequest";
import Account from "./CreateAccount";
import Login from "./Login";
import Logout from "./Logout";
import Artwork from "./Artwork";
import Rates from "./Rates";
import Invoice from "./CreateInvoice";
import VInvoice from "./ViewInvoice";
import Report from "./CreateReport";
import VReport from "./ViewReport";
import Strike from "./PlaceStrike";
import Remove from "./RemoveProfile";
import PInvoice from "./PendingInvoice";
import ForgotPassword from "./ForgotPassword";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";

const verifyTokenAPIURL = 'https://pk3vioz5q4.execute-api.us-east-1.amazonaws.com/gallieprod3/verify';

function App() {
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': '2tjbJfuJBWrpkvAUu5ax6lwdXKiYepG6yZhm9EJg'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>
  }

  return (
    <Router>
      <div className="App">
        <Menu />
        <main>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Homepage}/>
              {/* <Route path="/posts" exact component={Posts}/> */}
              <Route path="/Commission" component={Commission}/>
              <Route path="/Template" component={Template}/>
              <Route path="/Profile" component={Profile}/>
              <Route path="/Message" component={Message}/>
              <Route path="/Invoices" component={Invoices}/>
              <Route path="/Community Management" component={Management}/>
              <Route path="/Create Request" component={Request}/>
              <Route path="/View Request" component={VRequest}/>
              <Route path="/Create Account" component={Account}/>
              <Route path="/Login" component={Login}/>
              <PrivateRoute path="/Logout" component={Logout}/>
              <Route path="/Artwork" component={Artwork}/>
              <Route path="/Rates" component={Rates}/>
              <Route path="/Create Invoice" component={Invoice}/>
              <Route path="/View Invoice" component={VInvoice}/>
              <Route path="/Create Report" component={Report}/>
              <Route path="/View Report" component={VReport}/>
              <Route path="/Place Strike" component={Strike}/>
              <Route path="/Remove Profile" component={Remove}/>
              <Route path="/Pending Invoice" component={PInvoice}/>
              <PublicRoute path="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
