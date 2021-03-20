export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectURL = process.env.REACT_APP_DOMAIN_URL;
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getToken = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((accumulator: any, item) => {
      const parts = item.split("=");
      accumulator[parts[0]] = decodeURIComponent(parts[1]);
      return accumulator;
    }, {});
};
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
