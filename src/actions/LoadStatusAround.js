import {
    LOAD_ALL_STATUS_AROUND,
    LOADMORE_STATUS_AROUND,
    ITEMS_HAS_ERRORED
} from '../ultils/constants/actionTypes';
import url from '../ultils/constants/api';

const itemsHasErrored = (err) => {
    console.log('itemsHasErrored', err);
    return {
        type: ITEMS_HAS_ERRORED,
        payload: null
    };
};

const itemsFetchDataSuccess = (actionType, items) => {
    console.log('itemsFetchDataSuccess', actionType);
    // console.log('itemsFetchDataSuccess', items);
    return {
        type: actionType,
        payload: items
    };
};
const ActionGetAllStatusAround = (user, region, r) => (dispatch) => {
    //user :{userId, fbId, tokenId}, region, r, from, limit
    const link = url.urlGetStatusAroundUser(user, region, r, 0, 20);
    // console.log('url', link);
    fetch(link, {
        method: 'GET',
        headers: {
            fb_id: user.fbId,
            token_id: user.tokenId,
        },
    })
        .then((response) => {
            // console.log(response);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log('res', res);
            dispatch(itemsFetchDataSuccess(LOAD_ALL_STATUS_AROUND, res.results || []));
        })
        .catch((err) => dispatch(itemsHasErrored(err)));
};
const ActionLoadMoreStatusAround = (user, region, r, from) => (dispatch) => {
    //user :{userId, fbId, tokenId}, region, r, from, limit
    const link = url.urlGetStatusAroundUser(user, region, r, from, 20);
    fetch(link, {
        method: 'GET',
        headers: JSON.stringify({
            fb_id: user.fbId,
            token_id: user.tokenId,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((items) => dispatch(itemsFetchDataSuccess(LOADMORE_STATUS_AROUND, items.results)))
        .catch((err) => dispatch(itemsHasErrored(err)));
};

export {
    ActionGetAllStatusAround,
    ActionLoadMoreStatusAround
};
