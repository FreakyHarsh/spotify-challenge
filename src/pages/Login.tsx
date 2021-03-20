import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { accessUrl } from "../utils/getToken";

export const Login = () => {
  const classes = useStyles();
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      className={classes.login}
    >
      <img
        src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt='Spotify Logo'
        style={{ width: "100%" }}
      />
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </Box>
  );
};
const useStyles = makeStyles({
  login: {
    backgroundColor: "black",
    height: "100vh",
    "& > a ": {
      color: "white",
      textDecoration: "none",
      padding: "1rem",
      borderRadius: "99px",
      fontWeight: 800,
      backgroundColor: "#1db954",
    },
  },
});
