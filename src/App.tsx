import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import useTokens from "./utils/useTokens";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Redirect to="/" />
            </Route>
            <Route render={() => <div className="error">에러 페이지</div>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
