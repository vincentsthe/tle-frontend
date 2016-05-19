import { GET_TOP_RANKS, SET_TOP_RANK_ABOVE, SET_TOP_RANK_BELOW } from '../actions/topRankAction';
import clone from 'clone';


const defaultState = {
  rank: {
    data: [],
    above: 10,
    below: 0,
    isPending: true,
    isFulfilled: false,
    error: false,
  },
};

const topRank = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_TOP_RANKS}_PENDING`:
      newState.rank.isPending = true;

      return newState;
    case `${GET_TOP_RANKS}_FULFILLED`:
      newState.rank.isPending = false;
      newState.rank.isFulfilled = true;
      newState.rank.error = false;
      newState.rank.data = action.payload.data;
      return newState;
    case `${GET_TOP_RANKS}_REJECTED`:
      newState.rank.isPending = false;
      newState.rank.error = action.payload;
      return newState;
    case SET_TOP_RANK_ABOVE:
      newState.rank.above = action.payload;
      return newState;
    case SET_TOP_RANK_BELOW:
      newState.rank.below = action.payload;
      return newState;
    default:
      return state;
  }
};

export default topRank;
