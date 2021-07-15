import { useState } from "react";

import "./App.css";
import Routes from "./components/Routes";
import Login from "./components/Login/Login";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <Routes />
    </div>
  );
}

export default App;
