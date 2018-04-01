// 管理app状态
import * as ActionTypes from '../action/app.action';

const initState = {
    
}
// 整个app的action
export default function app(state = initState , action){
    const { type, ...orthers } = action ;
    switch (type) {
        case ActionTypes.LISTLOADING:
            return {...state, ...orthers}
        default:
            return state;
    }
}