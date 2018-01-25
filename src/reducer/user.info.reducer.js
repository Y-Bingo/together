import * as ActionTypes from '../action/user.info.actions';

const initState = {
    data : [],
    user : {},
}

export default function user_info(state=initState,action){
    const {type, ...orthers} = action;
    switch (type) {
        case ActionTypes.USER_INFO_SEARCH:
            return {...state,...orthers}
        default:
            return state;
    }
}