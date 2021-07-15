import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import Login from "./Login/Login";

export default () => (
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
        <Route render={() => <div className="error">에러 페이지</div>} />
      </Switch>
    </div>
  </BrowserRouter>
);
