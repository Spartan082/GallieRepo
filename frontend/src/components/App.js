import '../styles/App.scss';
import "../styles/homepage.scss";
import Homepage from "./Homepage.js";
import Menu from "./Menu.js";
import React from 'react';
import Commission from "./Commission";
import Info from "./Info";
import Profile from "./Profile";
import Report from "./Report";
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
              <Route path="/Info" component={Info}/>
              <Route path="/Profile" component={Profile}/>
              <Route path="/Report" component={Report}/>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
