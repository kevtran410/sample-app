import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'currentUser'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
  return createStore(persistedReducer, enhancer);
};

const store = configureStore();

const persistor = persistStore(store);

export { store, persistor };
