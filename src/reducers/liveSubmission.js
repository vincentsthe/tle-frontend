import { SET_SUBMISSION_SHOWN, SET_SUBMISSION_LIMIT } from '../actions/liveSubmissionAction';

const defaultState = {
  submission: {
    limit: 5,
    isShown: true,
  },
  userName: '',
};


const liveSubmission = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SUBMISSION_SHOWN:
      return {
        ...state,
        submission: {
          ...state.submission,
          isShown: action.payload,
        },
      };
    case SET_SUBMISSION_LIMIT:
      return {
        ...state,
        submission: {
          ...state.submission,
          limit: action.payload,
        },
      };
    default:
      return state;
  }
};

export default liveSubmission;
