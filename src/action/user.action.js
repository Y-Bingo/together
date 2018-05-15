import axios from 'axios';

export const LOGIN = "LOGIN";// 登录
export const REGISTER = "REGISTER";//注册
export const AUTH_SUCCESS = "AUTH_SUCCESS";// 验证成功 
export const EDIT = "EDIT";//编辑
export const ERROR_MSG = "ERROR_MSG";// 错误信息
export const CLEAN_MSG = "CLEAN_MSG";// 清除信息

const initState = {
    uid: 10000001,
    user_name: "未登录",
    user_sex: "boy",
    user_head: "http://localhost:3000/localImg/head-default.png",
    msg: "",
    user_signatrue: "这个用户很懒，什么都没留下"
};

export default function user(state = initState, action) {
    const {type , data, msg} = action;
    switch (type) {
        // case LOGIN: // 登录
        //     return {...state,　...data, msg} ;
        // case REGISTER: // 注册
        //     return {...state,...data, msg} ;
        case AUTH_SUCCESS: //登录成功
            return { ...state, msg: "",  ...data}
        case EDIT : // 编辑
            let {change_data} = action
            console.log({...state,...change_data});
            return {...state,...change_data};
        case ERROR_MSG : // 错误信息显示
            return {...state, msg };
        case CLEAN_MSG :
            return {...state, msg };
        default:
            return state;
    }
}
export function checkHasCookies(data){
    return {
        type: AUTH_SUCCESS,
        data:data 
    }
}
// 登录
export function login({ user_name, user_pwd }){
    console.log("action","登录");
    console.log({user_name,user_pwd});
    if( !user_name  || !user_pwd ){
        return error_msg('用户名密码必须输入！');
    }
    return (dispatch) => {
        axios.post("/user/login",{user_name, user_pwd})
            .then((res) => {
                console.log(res);
                if( res.status === 200 && res.data.code ){
                    dispatch(authSuccess(res.data))
                }else{
                    dispatch(error_msg(res.data.msg))
                }
            })
    }
}
// 注册
export function register({user_name, user_pwd, user_repwd}){
    console.log("action","注册");
    console.log({user_name,user_pwd});
    if(!user_name || !user_pwd ){
        return error_msg("用户名密码必须要输入！");
    }
    if (user_pwd !== user_repwd) {
        return error_msg("两次输入的密码不一样");
    }
    return (dispatch) => {
        axios.post('/user/register', { user_name, user_pwd })
            .then((res) => {
                if (res.status === 200 && res.data.code ) {
                    // 过滤掉pwd
                    dispatch(authSuccess(res.data));
                } else {
                    dispatch(error_msg(res.data.msg));
                }
            })
    }
}
// 用户验证
const authSuccess = (payload) => {
    // const {pwd , ...data} = data;
    // console.log(payload);
    return {
        type: AUTH_SUCCESS,
        data: payload.data
    }
}
const error_msg = (msg) => {
    return {
        type: ERROR_MSG, msg: msg
    }
}
export const clean_msg = () => {
    return {
        type : CLEAN_MSG,
        msg : ""
    }
}
// 编辑 
export function user_info_edit(change_data){
    console.log("触发编辑",change_data)
     return (dispatch) => {
        axios.post('/user/update', change_data)
            .then((res) => {
                if (res.status === 200 && res.data.code ) {
                    // 过滤掉pwd
                    dispatch(authSuccess(res.data));
                } else {
                    dispatch(error_msg(res.data.msg));
                }
            })
    }
}

