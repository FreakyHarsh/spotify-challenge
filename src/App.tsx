import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { Login } from "./pages/Login";
import { getToken } from "./utils/getToken";
import { setUser, setUserToken } from "./store/Actions/actions";
import { RootState } from "./index";
import { HomeScreen } from "./pages/HomeScreen";

const spotify = new SpotifyWebApi();
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [token, setToken] = useState("");
  useEffect(() => {
    const accessToken = getToken().access_token;
    dispatch(setUserToken(accessToken));
    setToken(accessToken);
    spotify.setAccessToken(accessToken);
    spotify
      .getMe()
      .then((user) => {
        dispatch(setUser(user));
      })
      .then((_) => history.push("/home"));
  }, []);
  return <div>{token ? <HomeScreen /> : <Login />}</div>;
}

export default App;
