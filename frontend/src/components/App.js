import '../styles/App.scss';
import "../styles/homepage.scss";
import Homepage from "./Homepage.js";
import Menu from "./Menu.js";
import React from 'react';
import Template from "./Template";
import Profile from "./Profile";
import Message from "./Message";
import Management from "./Management";
import Request from "./CreateRequest";
import VRequest from "./ViewRequest";
import Account from "./CreateAccount";
import Login from "./Login";
import Logout from "./Logout";
import UploadArtwork from "./UploadArtwork";
import RemoveArtwork from "./RemoveArtwork";
import Rates from "./Rates";
import Invoice from "./CreateInvoice";
import VInvoice from "./ViewInvoice";
import Report from "./CreateReport";
import VReport from "./ViewReport";
import Strike from "./ViewStrike";
import Remove from "./RemoveProfile";
import PInvoice from "./PendingInvoice";
import ForgotPassword from "./ForgotPassword";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ViewRequestDetails from './ViewRequestDetails';
import ViewInvoiceDetails from './ViewInvoiceDetails';
import ViewPendingDetails from './ViewPendingDetails';
import ViewReportDetails from './ViewReportDetails';
import ViewAccountStrikeDetails from './ViewAccountStrikeDetails';
//import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
//import axios from "axios";


function App() {
 


  return (
    <Router>
      <div className="App">
        <Menu />
        <main>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Homepage}/>
              {/* <Route path="/posts" exact component={Posts}/> */}
              <Route path="/Template" component={Template}/>
              <Route path="/Profile" component={Profile}/>
              <Route path="/Message" component={Message}/>
              <Route path="/Community Management" component={Management}/>
              <Route path="/Create Request" component={Request}/>
              <Route path="/View Request" component={VRequest}/>
              <Route path="/Create Account" component={Account}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Logout" component={Logout}/>
              <Route path="/UploadArtwork" component={UploadArtwork}/>
              <Route path="/RemoveArtwork" component={RemoveArtwork}/>
              <Route path="/Rates" component={Rates}/>
              <Route path="/Create Invoice" component={Invoice}/>
              <Route path="/View Invoice" component={VInvoice}/>
              <Route path="/Create Report" component={Report}/>
              <Route path="/View Report" component={VReport}/>
              <Route path="/View Strike" component={Strike}/>
              <Route path="/Remove Profile" component={Remove}/>
              <Route path="/Pending Invoice" component={PInvoice}/>
              <PublicRoute path="/forgot-password" component={ForgotPassword}/>
              <Route path="/ViewReportDetails/:id" component={ViewReportDetails} />
              <Route path="/ViewRequestDetails/:id" component={ViewRequestDetails} />
              <Route path="/ViewInvoiceDetails/:id" component={ViewInvoiceDetails} />
              <Route path="/ViewPendingDetails/:id" component={ViewPendingDetails} />
              <Route path="/ViewAccountStrikeDetails/:id" component={ViewAccountStrikeDetails} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
