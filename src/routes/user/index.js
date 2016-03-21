import React from 'react';
import UserPage from './User';
import { userApiUrl } from '../../config.js';
import fetch from '../../core/fetch';

export const path = '/user/:userName';
export const action = async (state) => {
  const { userName } = state.params;

  const userDataResponse = await fetch(`${userApiUrl}/search/username/${userName}`);
  const userData = await userDataResponse.json();
  const userId = userData.id;

  const rankResponse = await fetch(`${userApiUrl}/rank/user/${userId}`);
  const { rank } = await rankResponse.json();
  userData.rank = rank;

  state.context.onSetTitle(`${userData.name} (${userName}) | TLE`);
  return <UserPage userData={userData} />;
};
