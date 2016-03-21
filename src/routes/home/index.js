import React from 'react';
import Home from './Home';

export const path = '/';
export const action = (state) => {
  state.context.onSetTitle('TLE');
  return <Home />;
};
