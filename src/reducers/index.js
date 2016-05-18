import { combineReducers } from 'redux';
import header from './header';
import liveSubmission from './liveSubmission';
import userSubmission from './userSubmission';
import problemRecommendation from './problemRecommendation';
import rank from './rank';

const tleApp = combineReducers({
  header,
  liveSubmission,
  userSubmission,
  problemRecommendation,
  rank,
});

export default tleApp;
