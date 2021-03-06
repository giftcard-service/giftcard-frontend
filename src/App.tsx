import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import QrScan from "./components/QrScan/QrScan";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Login/Signup";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import NotFound from "./components/Error/NotFound";
import Unauthorized from "./components/Error/Unauthorized";
import GiftcardDetail from "./components/Giftcard/GiftcardDetail";
import QrRead from "./components/QrScan/QrRead";
import GiftcardPurchaseList from "./components/GiftcardPurchase/GiftcardPurchaseList";
import GiftcardGive from "./components/Giftcard/GiftcardGive";
import GiftcardList from "./components/Giftcard/GiftcardList";
import GiftcardNotificationList from "./components/GiftcardNotification/GiftcardNotificationList";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/qr" component={QrScan} />
            <Route exact path="/qr-read" component={QrRead} />
            <Route exact path="/giftcards" component={GiftcardList} />
            <Route exact path="/giftcard-purchases" component={GiftcardPurchaseList} />
            <Route exact path="/giftcard-give" component={GiftcardGive} />
            <Route exact path="/notifications" component={GiftcardNotificationList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout">
              <Redirect to="/" />
            </Route>
            <Route exact path="/giftcards/:giftcardId" component={GiftcardDetail} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route exact path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
