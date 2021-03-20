import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { spotifyUserType } from "../types/spotifyUserType";
import { Avatar, Box, Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

export const Home = () => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.userState.user as spotifyUserType);
  console.log(user.images[0].url);
  return (
    <Box>
      <div className={classes.home}>
        <Avatar alt={user.display_name} src={user.images[0].url} className={classes.large} />
        <Typography variant='h4'>{user.display_name}</Typography>
      </div>
      <Card className={classes.card}>
        <Typography variant='overline'>Total Followers: {user.followers.total}</Typography>
      </Card>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    home: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "row",
        "& > h4": {
          textAlign: "center",
          padding: "1rem",
          fontSize: "1.5rem",
        },
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
      },
    },
    large: {
      [theme.breakpoints.down("md")]: {
        width: "50%",
        height: "50%",
      },
      [theme.breakpoints.up("md")]: {
        width: "30%",
        height: "30%",
      },
    },
    card: {
      width: "100%",
      marginTop: "1rem",
      padding: "1rem",
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        width: "50%",
        margin: "1rem auto",
      },
    },
  })
);
