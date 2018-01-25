import * as ActionTypes from '../action/user.action';

const initState = {
    uid : "001",
    user_name : "",
    user_sex : "boy"
};

export default function user(state = initState, action) {
    const {type , ...orther} = action;
    switch (type) {
        case ActionTypes.LOGIN: // 登录
            return {...state,...orther} ;
        case ActionTypes.REGISTER: // 注册
            return {...state,...orther} ;
        case ActionTypes.EDIT : // 编辑
            return {...state,...orther};
        default:
            return state;
    }
}