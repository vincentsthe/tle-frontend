import { GET_USER_RANKS, SET_USER_RANK_ABOVE, SET_USER_RANK_BELOW } from '../actions/userRankAction';
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
};

const userRank = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_USER_RANKS}_PENDING`:
      newState.rank.isPending = true;

      return newState;
    case `${GET_USER_RANKS}_FULFILLED`:
      newState.rank.isPending = false;
      newState.rank.isFulfilled = true;
      newState.rank.error = false;
      newState.rank.data = action.payload.data;
      return newState;
    case `${GET_USER_RANKS}_REJECTED`:
      newState.rank.isPending = false;
      newState.rank.error = action.payload;
      return newState;
    case SET_USER_RANK_ABOVE:
      newState.rank.above = action.payload;
      return newState;
    case SET_USER_RANK_BELOW:
      newState.rank.below = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userRank;
