import { combineReducers } from 'redux';
import submission from './submission';
import header from './header';

const tleApp = combineReducers({
  submission,
  header,
});

export default tleApp;
