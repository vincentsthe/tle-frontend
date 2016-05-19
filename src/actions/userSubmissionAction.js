import request from 'axios';
import { submissionApiUrl } from '../config';

export const GET_SUBMISSIONS = 'GET_SUBMISSIONS';
export function getSubmissions({ userId, problemId, limit }) {
  return {
    type: GET_SUBMISSIONS,
    payload: {
      promise: request.get(submissionApiUrl, {
        params: {
          limit,
          problem_id: problemId,
          user_id: userId,
        },
      }),
    },
  };
}

export const SET_SUBMISSION_LIMIT = 'SET_SUBMISSION_LIMIT';
export function setSubmissionLimit(limit = 5) {
  return {
    type: SET_SUBMISSION_LIMIT,
    payload: limit,
  };
}

export const SET_SUBMISSION_SHOWN = 'SET_SUBMISSION_SHOWN';
export function setSubmissionShown(show = true) {
  return {
    type: SET_SUBMISSION_SHOWN,
    payload: show,
  };
}

export const SET_USER_NAME = 'SET_USER_NAME';
export function setUserName(userName) {
  return {
    type: SET_USER_NAME,
    payload: userName,
  };
}
