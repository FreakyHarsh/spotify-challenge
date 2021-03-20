import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

import { HomeScreen } from "./pages/HomeScreen";
import { Login } from "./pages/Login";
import { setUser, setUserToken } from "./store/Actions/actions";
import { getToken } from "./utils/getToken";

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
