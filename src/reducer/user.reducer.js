import * as ActionTypes from '../action/user.action';

const initState = {
    user_id : "001",
    user_name : "",
    user_sex : "boy",
    user_head : "boy",
    msg : "",
};

export default function user(state = initState, action) {
    const {type , ...orther} = action;
    switch (type) {
        case ActionTypes.LOGIN: // 登录
            return {...state,...orther} ;
        case ActionTypes.REGISTER: // 注册
            return {...state,...orther} ;
        case ActionTypes.AUTH_SUCCESS: //登录成功
            return { ...state, msg: "", ...action.payload }
        case ActionTypes.EDIT : // 编辑
            return {...state,...orther};
        case ActionTypes.CARE: // 关注
            return {...state, ...orther };
        case ActionTypes.ERROR_MSG : // 错误信息显示
            return {...state, ...orther };
        case ActionTypes.CLEAN_MSG :
            return {...state, ...orther };
        default:
            return state;
    }
}


