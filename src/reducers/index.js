import { combineReducers } from 'redux';
import submission from './submission';
import liveSubmission from './liveSubmission';

const tleApp = combineReducers({
  submission,
  liveSubmission,
});

export default tleApp;
