/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import tleApp from './reducers';

const loggerMiddleware = createLogger();
const store = createStore(tleApp, applyMiddleware(promiseMiddleware(), loggerMiddleware));

const routes = [
  require('./routes/home'),
  require('./routes/contact'),
  require('./routes/login'),
  require('./routes/register'),
];

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <Provider store={store}><App context={state.context}>{component}</App></Provider>;
  });

  routes.forEach(route => {
    on(route.path, route.action);
  });

  on('*', async (state) => {
    const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    const response = await fetch(query);
    const { data } = await response.json();
    return data && data.content && <ContentPage {...data.content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
