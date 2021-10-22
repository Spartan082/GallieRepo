import '../styles/App.scss';
import "../styles/homepage.scss";
import Homepage from "./Homepage.js";
import Menu from "./Menu.js";
import React from 'react';
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
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
              <Route path="/Logout" component={Logout}/>
              <Route path="/Artwork" component={Artwork}/>
              <Route path="/Rates" component={Rates}/>
              <Route path="/Create Invoice" component={Invoice}/>
              <Route path="/View Invoice" component={VInvoice}/>
              <Route path="/Create Report" component={Report}/>
              <Route path="/View Report" component={VReport}/>
              <Route path="/Place Strike" component={Strike}/>
              <Route path="/Remove Profile" component={Remove}/>
              <Route path="/Pending Invoice" component={PInvoice}/>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
