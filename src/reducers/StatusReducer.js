import { LOAD_ALL_STATUS_AROUND, LOADMORE_STATUS_AROUND, ITEMS_HAS_ERRORED }
    from '../ultils/constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case LOAD_ALL_STATUS_AROUND:
            return action.payload;
        case LOADMORE_STATUS_AROUND:
            return [...state, ...action.payload];
        case ITEMS_HAS_ERRORED:
            return state || undefined;
        default:
            return state;
    }
};
