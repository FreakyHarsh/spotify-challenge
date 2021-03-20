import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { Login } from "./pages/Login";
import { getToken } from "./utils/getToken";
import { setUser, setUserToken } from "./store/actions/actions";
import { RootState } from "./index";
import { HomeScreen } from "./pages/HomeScreen";

const spotify = new SpotifyWebApi();
function App() {
  const dispatch = useDispatch();
  // const userState = useSelector((state: RootState) => state.user);
  // const token = userState.token;
  const [token, setToken] = useState("");
  useEffect(() => {
    const accessToken = getToken().access_token;
    dispatch(setUserToken(accessToken));
    setToken(accessToken);
    spotify.setAccessToken(accessToken);
    spotify.getMe().then((user) => {
      dispatch(setUser(user));
    });
  }, []);
  return <div>{token ? <HomeScreen /> : <Login />}</div>;
}

export default App;
