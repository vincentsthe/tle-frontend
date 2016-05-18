import request from 'axios';
import { problemRecommendationApiUrl } from '../config';

export const GET_PROBLEM_RECOMMENDATIONS = 'GET_PROBLEM_RECOMMENDATIONS';
export function getRecommendations({ userId, limit }) {
  return {
    type: GET_PROBLEM_RECOMMENDATIONS,
    payload: {
      promise: request.get(problemRecommendationApiUrl, {
        params: {
          limit,
          user_id: userId,
        },
      }),
    },
  };
}

export const SET_PROBLEM_RECOMMENDATION_LIMIT = 'SET_PROBLEM_RECOMMENDATION_LIMIT';
export function setRecommendationLimit(limit = 25) {
  return {
    type: SET_PROBLEM_RECOMMENDATION_LIMIT,
    payload: limit,
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
