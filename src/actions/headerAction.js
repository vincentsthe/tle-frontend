export const SET_USER_NAME = 'SET_USER_NAME';
export function setUserName(userName = '') {
  return {
    type: SET_USER_NAME,
    payload: userName,
  };
}
