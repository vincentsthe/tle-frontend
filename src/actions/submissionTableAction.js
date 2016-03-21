import request from 'axios';
import { submissionApiUrl } from '../config';

export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state,
  };
}

export const GET_SUBMISSIONS = 'GET_SUBMISSIONS';
export function getSubmissions({ userId, problemId, limit }) {
  return {
    type: GET_SUBMISSIONS,
    payload: {
      promise: request.get(submissionApiUrl, {
        params: {
          limit,
          problemId,
          userId,
        },
      }),
    },
  };
}
