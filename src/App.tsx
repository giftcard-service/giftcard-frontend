import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import NotFound from "./components/Error/NotFound";
import QrScan from "./components/QrScan/QrScan";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/qr" component={QrScan} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout">
              <Redirect to="/" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
