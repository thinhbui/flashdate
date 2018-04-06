import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import reducers from './reducers';

const middleWare = [thunkMiddleWare];
const store = createStore(reducers,
    {},
    applyMiddleware(...middleWare));
export default store;
