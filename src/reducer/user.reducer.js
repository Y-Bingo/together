import {
    LOGIN,
    AUTH_SURE,
    REGISTER
} from '../action/user.action';

const initState = {};

export default function user(state = initState, action) {
    const {type , ...orther} = action;
    switch (type) {
        case LOGIN:
            return {...state,...orther} ;
        case REGISTER:
            return {...state,...orther} ;
        default:
            return state;
    }
}