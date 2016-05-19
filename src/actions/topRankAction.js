import request from 'axios';
import { rankApiUrl } from '../config';

export const GET_TOP_RANKS = 'GET_TOP_RANKS';
export function getRanks({ start, limit }) {
  return {
    type: GET_TOP_RANKS,
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

export const SET_TOP_RANK_ABOVE = 'SET_TOP_RANK_ABOVE';
export function setRankAbove(above = 10) {
  return {
    type: SET_TOP_RANK_ABOVE,
    payload: above,
  };
}

export const SET_TOP_RANK_BELOW = 'SET_TOP_RANK_BELOW';
export function setRankBelow(below = 10) {
  return {
    type: SET_TOP_RANK_BELOW,
    payload: below,
  };
}
