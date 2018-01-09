import {
    LOGIN,
    AUTH_SURE
} from '../action/user.action';

const initState = {};

export default function user(state = initState, action) {
    const {type , ...orther} = action;
    switch (type) {
        case LOGIN:
            return {...state,...orther} ;
        default:
            return state;
    }
}