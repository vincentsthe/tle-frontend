import { combineReducers } from 'redux';
import header from './header';
import submission from './submission';
import liveSubmission from './liveSubmission';

const tleApp = combineReducers({
  header,
  submission,
  liveSubmission,
});

export default tleApp;
