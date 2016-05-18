import { GET_RANKS, SET_STATE, SET_USER_NAME, SET_RANK_ABOVE, SET_RANK_BELOW } from '../actions/rankAction';
import clone from 'clone';


const defaultState = {
  rank: {
    data: [],
    above: 5,
    below: 5,
    isPending: true,
    isFulfilled: false,
    error: false,
  },
  userName: '',
};

const setState = (state, newState) => state.merge(newState);

const rank = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_RANKS}_PENDING`:
      newState.rank.isPending = true;

      return newState;
    case `${GET_RANKS}_FULFILLED`:
      newState.rank.isPending = false;
      newState.rank.isFulfilled = true;
      newState.rank.error = false;
      newState.rank.data = action.payload.data;
      return newState;
    case `${GET_RANKS}_REJECTED`:
      newState.rank.isPending = false;
      newState.rank.error = action.payload;
      return newState;
    case SET_USER_NAME:
      newState.userName = action.payload;
      return newState;
    case SET_STATE:
      return setState(state, action.state);
    case SET_RANK_ABOVE:
      newState.rank.above = action.payload;
      return newState;
    case SET_RANK_BELOW:
      newState.rank.below = action.payload;
      return newState;
    default:
      return state;
  }
};

export default rank;
