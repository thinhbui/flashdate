import { combineReducers } from 'redux';

import RootNavigator from '../RootNavigator';
import StatusReducer from './StatusReducer';

const navReducer = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};
export default combineReducers({
    navReducer,
    StatusReducer
});
