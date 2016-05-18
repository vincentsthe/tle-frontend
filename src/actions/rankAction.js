import request from 'axios';
import { rankApiUrl } from '../config';

export const GET_RANKS = 'GET_RANKS';
export function getRanks({ userId, start, limit }) {
  return {
    type: GET_RANKS,
    payload: {
      promise: request.get(rankApiUrl, {
        params: {
          start,
          limit,
        },
      }),
    },
  };
}

export const SET_RANK_ABOVE = 'SET_RANK_ABOVE';
export function setRankAbove(above = 5) {
  return {
    type: SET_RANK_ABOVE,
    payload: above,
  };
}

export const SET_RANK_BELOW = 'SET_RANK_BELOW';
export function setRankBelow(below = 5) {
  return {
    type: SET_RANK_BELOW,
    payload: below,
  };
}

export const SET_USER_NAME = 'SET_USER_NAME';
export function setUserName(userName) {
  return {
    type: SET_USER_NAME,
    payload: userName,
  };
}

export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state,
  };
}
