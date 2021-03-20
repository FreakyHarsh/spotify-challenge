import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { RootState } from "../index";

const spotify = new SpotifyWebApi();

export const Search = () => {
  const [search, setSearch] = useState("");
  const userState = useSelector((state: RootState) => state.userState);
  const [typeQuery, setTypeQuery] = useState("");
  const [result, setResult] = useState<any>();
  const classes = useStyles();

  const [options, setOptions] = React.useState<{ [_: string]: boolean }>({
    track: true,
    album: false,
    artist: false,
    playlist: false,
  });

  useEffect(() => {
    const selectedTypes = Object.keys(options)
      .filter((key) => options[key])
      .join("%2C");
    setTypeQuery(selectedTypes);
  }, [options]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(baseURL + `/search?q=${search}&type=${typeQuery}&limit=5`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userState.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data);
      console.log(res);
      setResult(res);
    };

    const debounce = setTimeout(() => {
      getData();
    }, 500);
    return () => clearTimeout(debounce);
  }, [search, typeQuery]);
  return (
    <div>
      <TextField variant='outlined' label='Search' onChange={handleSearch} size='small' />
      <FormGroup style={{ marginTop: "1rem" }} row>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.track}
              onChange={handleOptions}
              name='track'
              color='primary'
            />
          }
          label='Track'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.album}
              onChange={handleOptions}
              name='album'
              color='primary'
            />
          }
          label='Album'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.artist}
              onChange={handleOptions}
              name='artist'
              color='primary'
            />
          }
          label='Artist'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.playlist}
              onChange={handleOptions}
              name='playlist'
              color='primary'
            />
          }
          label='Playlist'
        />
      </FormGroup>
      {result && !result.error ? (
        <div>
          {console.log(result.tracks.items)}
          {result.tracks.items.map((item: any) => {
            return (
              <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      Popularity: {item.popularity}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={item.album.images[1].url}
                  title={item.name}
                />
              </Card>
            );
          })}
        </div>
      ) : (
        <div>
          Right now, Due to time constraints, only track ui has been done. Though the logic for
          fetching data based on checkbox selection has been made and you can{" "}
          <strong>CHECK THE RESPONSE on console</strong>
        </div>
      )}
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
  })
);
