import '../styles/App.scss';
import Navigation from "./Navigation";
import Posts from "./Posts";
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
        <Navigation />
        <main>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Posts}/>
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
