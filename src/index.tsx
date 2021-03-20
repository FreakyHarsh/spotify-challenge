import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

(window as any).domainURL = process.env.REACT_APP_DOMAIN_URL;
const theme = createMuiTheme({
  palette: {
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
console.log(domainURL);
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
