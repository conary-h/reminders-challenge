import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';

const rootReducer = () => {};

const initialState = {};

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), reduxDevTools)
);

export default store;
