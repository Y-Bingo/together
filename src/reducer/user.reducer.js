import * as ActionTypes from '../action/user.action';
// uid: { "type": Number, require: true } ,//  这是一个用户ID
// user_name: { "type": String, require: true },//用户名
// user_pwd: { "type": String, require: true },//用户密码
// user_creat_time: { "type": Date, default: Date.now }, // 创建时间
// user_age: { type: Number, default: 0 },//年龄
// user_sex: { type: String, enum: ["boy", "girl"] },//性别
// user_city: { type: String, default: "广东工业大学" },//所在城市
// user_head: { type: String, default: 'boy' }, // 头像
// user_touch: {//用户的联系方式
//     QQ: { type: String, default: "" },
//     tel: { type: Number, default: 110 }
// },
// user_signatrue: { type: String, default: "这个用户很懒，什么都没留下" },//用户签名
// user_love_topic: [//用户喜爱的活动类型
//     {
//         topic_type: String // 类型
//     }
// ]
const initState = {
    uid : "001",
    user_name : "YB",
    user_sex : "boy",
    user_head : "",
    msg : "",
    user_signatrue: "你若安好，便是晴天"
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
            let {change_data} = orther
            console.log({...state,...change_data});
            return {...state,...change_data};
        case ActionTypes.ERROR_MSG : // 错误信息显示
            return {...state, ...orther };
        case ActionTypes.CLEAN_MSG :
            return {...state, ...orther };
        default:
            return state;
    }
}


