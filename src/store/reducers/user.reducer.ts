import { UserActionTypes as Actions } from '../actionTypes';
interface userState {
  user: null | string,
  playlists: [],
  spotify: null,
  discoverWeekly: null,
  topArtists: null,
  playing: false,
  item: null,
  token: string | null;
}

export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discoverWeekly: null,
  topArtists: null,
  playing: false,
  token: null,
  item: null,
} as userState;

const userReducer = (state = initialState, action: { type: Actions, payload?: any }) => {
  console.log(action);
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;