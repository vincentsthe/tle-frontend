import { GET_LIVE_SUBMISSIONS, SET_LIVE_SUBMISSION_SHOWN, SET_LIVE_SUBMISSION_LIMIT } from '../actions/liveSubmissionAction';
import clone from 'clone';


const defaultState = {
  submission: {
    data: [],
    limit: 5,
    isPolling: true,
    isShown: true,
    isPending: true,
    isFulfilled: false,
    error: false,
  },
  userName: '',
};

const liveSubmission = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_LIVE_SUBMISSIONS}_PENDING`:
      newState.submission.isPending = true;

      return newState;
    case `${GET_LIVE_SUBMISSIONS}_FULFILLED`:
      newState.submission.isPending = false;
      newState.submission.isFulfilled = true;
      newState.submission.error = false;
      newState.submission.data = action.payload.data;
      return newState;
    case `${GET_LIVE_SUBMISSIONS}_REJECTED`:
      newState.submission.isPending = false;
      newState.submission.error = action.payload;
      return newState;
    case SET_LIVE_SUBMISSION_SHOWN:
      newState.submission.isPolling = action.payload;
      newState.submission.isShown = action.payload;
      return newState;
    case SET_LIVE_SUBMISSION_LIMIT:
      newState.submission.limit = action.payload;
      return newState;
    default:
      return state;
  }
};

export default liveSubmission;
