// 管理app状态
import * as ActionTypes from '../action/app.action';

const initState = {
    cur_user: {
        uid : "001",
        user_name : "adimin"
    }, // 当前登录的用户

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