import { GET_SUBMISSIONS, SET_STATE } from '../actions/submissionTableAction';

const defaultState = {
  data: [],
  isPending: true,
  isFulfilled: false,
  error: false,
};

const setState = (state, newState) => state.merge(newState);

const submission = (state = defaultState, action) => {
  switch (action.type) {
    case `${GET_SUBMISSIONS}_PENDING`:
      return {
        ...state,
        isPending: true,
      };
    case `${GET_SUBMISSIONS}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        error: false,
        data: action.payload.data,
      };
    case `${GET_SUBMISSIONS}_REJECTED`:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    case SET_STATE:
      return setState(state, action.state);
    default:
      return state;
  }
};

export default submission;
