import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import useTokens from "./utils/useTokens";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout">
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
