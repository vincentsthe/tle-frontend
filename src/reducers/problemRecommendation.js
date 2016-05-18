import { GET_PROBLEM_RECOMMENDATIONS, SET_STATE, SET_USER_NAME, SET_PROBLEM_RECOMMENDATION_LIMIT } from '../actions/problemRecommendationAction';
import clone from 'clone';


const defaultState = {
  recommendation: {
    data: [],
    limit: 10,
    isPending: true,
    isFulfilled: false,
    error: false,
  },
  userName: '',
};

const setState = (state, newState) => state.merge(newState);

const problemRecommendation = (state = defaultState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case `${GET_PROBLEM_RECOMMENDATIONS}_PENDING`:
      newState.recommendation.isPending = true;

      return newState;
    case `${GET_PROBLEM_RECOMMENDATIONS}_FULFILLED`:
      newState.recommendation.isPending = false;
      newState.recommendation.isFulfilled = true;
      newState.recommendation.error = false;
      newState.recommendation.data = action.payload.data;
      return newState;
    case `${GET_PROBLEM_RECOMMENDATIONS}_REJECTED`:
      newState.recommendation.isPending = false;
      newState.recommendation.error = action.payload;
      return newState;
    case SET_STATE:
      return setState(state, action.state);
    case SET_USER_NAME:
      newState.userName = action.payload;
      return newState;
    case SET_PROBLEM_RECOMMENDATION_LIMIT:
      newState.recommendation.limit = action.payload;
      return newState;
    default:
      return state;
  }
};

export default problemRecommendation;
