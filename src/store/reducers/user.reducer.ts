import { UserActionTypes as Actions } from '../actionTypes';
interface userState {
  user: null | string,
  playlists: [],
  spotify: null,
  discoverWeekly: null,
  topArtists: null,
  playing: false,
  item: null,
  token: string | null,
}

export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discoverWeekly: null,
  topArtists: null,
  playing: false,
  token: 'BQAmn0ItwCSI9ISyElYWwh-AU_rV_Kc-tvBvS8fU9fg6su3Kja-k3gouX4KlAa_EcL7DfZlABP3K1fOx-VdBBkHesBPfihHnoAGLNTVuuOWw6u8rd_Yj2_Er24F5F-Cy92dAIPYVHC66Aby7Ay02qZMOWuez_0ZNB-kvJ57VT2mX7dASfDgM',
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