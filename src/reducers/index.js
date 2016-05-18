import { combineReducers } from 'redux';
import header from './header';
import liveSubmission from './liveSubmission';
import userSubmission from './userSubmission';
import problemRecommendation from './problemRecommendation';

const tleApp = combineReducers({
  header,
  liveSubmission,
  userSubmission,
  problemRecommendation,
});

export default tleApp;
