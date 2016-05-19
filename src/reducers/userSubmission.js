import { GET_SUBMISSIONS, SET_USER_NAME, SET_SUBMISSION_SHOWN, SET_SUBMISSION_LIMIT } from '../actions/userSubmissionAction';
import clone from 'clone';


const defaultState = {
  submission: {
    data: [],
    limit: 10,
    isPolling: false,
    isShown: true,
    isPending: true,
    isFulfilled: false,
    error: false,
  },
  userName: '',
};

// const setState = (state, newState) => state.merge(newState);

const userSubmission = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_SUBMISSIONS}_PENDING`:
      newState.submission.isPending = true;

      return newState;
    case `${GET_SUBMISSIONS}_FULFILLED`:
      newState.submission.isPending = false;
      newState.submission.isFulfilled = true;
      newState.submission.error = false;
      newState.submission.data = action.payload.data;
      return newState;
    case `${GET_SUBMISSIONS}_REJECTED`:
      newState.submission.isPending = false;
      newState.submission.error = action.payload;
      return newState;
    case SET_USER_NAME:
      newState.userName = action.payload;
      return newState;
    case SET_SUBMISSION_SHOWN:
      newState.submission.isShown = action.payload;
      return newState;
    case SET_SUBMISSION_LIMIT:
      newState.submission.limit = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userSubmission;
