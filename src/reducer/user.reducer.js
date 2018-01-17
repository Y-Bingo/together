import * as ActionTypes from '../action/user.action';

const initState = {};

export default function user(state = initState, action) {
    const {type , ...orther} = action;
    switch (type) {
        case ActionTypes.LOGIN:
            return {...state,...orther} ;
        case ActionTypes.REGISTER:
            return {...state,...orther} ;
        default:
            return state;
    }
}