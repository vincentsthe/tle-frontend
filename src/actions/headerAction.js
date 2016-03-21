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
