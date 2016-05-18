/* eslint-disable max-len */
/* jscs:disable maximumLineLength */
export const appName = 'TLE';
export const port = process.env.PORT || 5555;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const apiBaseUrl = 'http://localhost:3000/api/v0.1';
export const submissionApiUrl = `${apiBaseUrl}/submission`;
export const problemApiUrl = `${apiBaseUrl}/problem`;
export const userApiUrl = `${apiBaseUrl}/user`;

export const problemRecommendationApiUrl = `${problemApiUrl}/recommendation`;
export const rankApiUrl = `${userApiUrl}/rank`;

export const analytics = {

  // https://analytics.google.com/
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' },

};
