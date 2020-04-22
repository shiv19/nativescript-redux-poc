import { applyMiddleware, createStore } from 'redux';
require("nativescript-nodeify");
const composeWithDevTools = require('remote-redux-devtools').composeWithDevTools;
// import { createLogger } from 'redux-logger';
import { getString } from '@nativescript/core/application-settings';
import rootReducer from '~/state/reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  hostname: '192.168.1.82',
  port: 8000,
  realtime: true,
  suppressConnectErrors: false
});

// const loggerMiddleware = createLogger();
export const store = createStore(rootReducer,
  JSON.parse(getString('appState', '{}')),
  composeEnhancers(
    applyMiddleware(
      thunk,
      // loggerMiddleware
    )
  )
);
