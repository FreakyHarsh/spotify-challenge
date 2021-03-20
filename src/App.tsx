import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { Login } from "./pages/Login";
import { getToken } from "./utils/getToken";
function App() {
  useEffect(() => {
    const token = getToken();
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
