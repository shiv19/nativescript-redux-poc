import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
const composeWithDevTools = require('remote-redux-devtools').composeWithDevTools;
// import { createLogger } from 'redux-logger';
import rootReducer from '~/store/reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  hostname: '192.168.1.82',
  port: 8000,
  realtime: !global.isProduction
});

// const loggerMiddleware = createLogger();

export const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      // loggerMiddleware
    )
  ));

export const persistor = persistStore(store);
