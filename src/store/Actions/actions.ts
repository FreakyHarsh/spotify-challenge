import { UserActionTypes as Actions } from '../actionTypes';

export const setUserToken = (token: string) => {
  localStorage.setItem('token', token);
  return (dispatch: any) => {
    return dispatch({ type: Actions.SET_TOKEN, payload: token })
  }
}

export const setUser = (user: any) => {
  return (dispatch: any) => {
    return dispatch({ type: Actions.SET_USER, payload: user })
  }
}