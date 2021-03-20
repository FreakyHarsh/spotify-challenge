import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { Login } from "./pages/Login";
import { getToken } from "./utils/getToken";
function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = getToken().access_token;
    console.log(token);
  }, []);
  return (
    <BrowserRouter>
      <Route path='/'>
        <Login />
      </Route>
    </BrowserRouter>
  );
}

export default App;
