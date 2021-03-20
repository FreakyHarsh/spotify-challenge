import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import userReducer from "./store/reducers/user.reducer";

(window as any).domainURL = process.env.REACT_APP_DOMAIN_URL;
(window as any).baseURL = "https://api.spotify.com/v1";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1db954",
      contrastText: "white",
    },
    action: {
      disabledBackground: `rgb(179,178,164)`,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          fontFamily: `"Roboto", sans-serif`,
          scrollBehavior: "smooth",
        },
      },
    },
  },
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  userState: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
