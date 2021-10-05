import { BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PremiumContent from "./PremiumContent";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div className="header">
       <NavLink exact activeClassName="active" to="/">{Home}</NavLink>
       <NavLink activeClassName="active" to="/register">{Register}</NavLink>
       <NavLink activeClassName="active" to="/login">{Login}</NavLink>
       <NavLink activeClassName="active" to="/premium-content">{PremiumContent}</NavLink>
     </div>
     <div className="content">
     <Switch>
       <Route exact path="/" component={Home}/>
       <Route path="/register" componet={Register}/>
       <Route path="/login" componet={Login}/>
       <Route path="/premium-content" componet={PremiumContent}/>
     </Switch>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
