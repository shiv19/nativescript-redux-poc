import { applyMiddleware, createStore } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
const composeWithDevTools = require('remote-redux-devtools').composeWithDevTools;
// import { createLogger } from 'redux-logger';
import createAppStorage from '~/utils/createAppStorage';
import { migrations } from '~/store/migrations';
import rootReducer from '~/store/reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  hostname: '192.168.1.82',
  port: 8000,
  realtime: !global.isProduction
});
const persistConfig = {
  key: 'root',
  version: 3,
  storage: createAppStorage(),
  // only the keys in this whitelist will be persisted
  whitelist: [
    'todos'
  ],
  migrate: createMigrate(migrations, { debug: true })
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const loggerMiddleware = createLogger();

export const store = createStore(persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      // loggerMiddleware
    )
  ));

export const persistor = persistStore(store);
