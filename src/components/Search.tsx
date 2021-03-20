import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { RootState } from "../index";

const spotify = new SpotifyWebApi();

export const Search = () => {
  const [search, setSearch] = useState("");
  const userState = useSelector((state: RootState) => state.userState);
  const [typeQuery, setTypeQuery] = useState("");
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
      const res = await fetch(baseURL + `/search?q=${search}&type=${typeQuery}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userState.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data);
      console.log(res);
    };
    const debounce = setTimeout(() => {
      getData();
    }, 3000);
    return () => clearTimeout(debounce);
  }, [search]);
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
    </div>
  );
};
