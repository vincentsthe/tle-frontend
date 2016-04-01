import { combineReducers } from 'redux';
import header from './header';
import liveSubmission from './liveSubmission';
import userSubmission from './userSubmission';

const tleApp = combineReducers({
  header,
  liveSubmission,
  userSubmission,
});

export default tleApp;
