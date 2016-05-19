import { combineReducers } from 'redux';
import header from './header';
import liveSubmission from './liveSubmission';
import userSubmission from './userSubmission';
import problemRecommendation from './problemRecommendation';
import userRank from './userRank';
import topRank from './topRank';

const tleApp = combineReducers({
  header,
  liveSubmission,
  userSubmission,
  problemRecommendation,
  userRank,
  topRank,
});

export default tleApp;
