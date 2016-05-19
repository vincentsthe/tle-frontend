import request from 'axios';
import { rankApiUrl } from '../config';

export const GET_USER_RANKS = 'GET_USER_RANKS';
export function getRanks({ start, limit }) {
  return {
    type: GET_USER_RANKS,
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

export const SET_USER_RANK_ABOVE = 'SET_USER_RANK_ABOVE';
export function setRankAbove(above = 5) {
  return {
    type: SET_USER_RANK_ABOVE,
    payload: above,
  };
}

export const SET_USER_RANK_BELOW = 'SET_USER_RANK_BELOW';
export function setRankBelow(below = 5) {
  return {
    type: SET_USER_RANK_BELOW,
    payload: below,
  };
}
