import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { Login } from "./pages/Login";
import { getToken } from "./utils/getToken";
function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const accessToken = getToken().access_token;
    setToken(accessToken);
  }, []);
  return (
    <Route path='/'>
      <Login />
    </Route>
  );
}

export default App;
