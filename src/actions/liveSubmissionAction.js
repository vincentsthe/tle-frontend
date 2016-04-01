import request from 'axios';
import { submissionApiUrl } from '../config';

export const GET_LIVE_SUBMISSIONS = 'GET_LIVE_SUBMISSIONS';
export function getSubmissions({ userId, problemId, limit }) {
  return {
    type: GET_LIVE_SUBMISSIONS,
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

export const SET_LIVE_SUBMISSION_LIMIT = 'SET_LIVE_SUBMISSION_LIMIT';
export function setSubmissionLimit(limit = 5) {
  return {
    type: SET_LIVE_SUBMISSION_LIMIT,
    payload: limit,
  };
}

export const SET_LIVE_SUBMISSION_SHOWN = 'SET_LIVE_SUBMISSION_SHOWN';
export function setSubmissionShown(show = true) {
  return {
    type: SET_LIVE_SUBMISSION_SHOWN,
    payload: show,
  };
}
