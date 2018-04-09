
import axios from 'axios';

export const LOGIN = "LOGIN";// 登录
export const REGISTER = "REGISTER";//注册
export const AUTH_SUCCESS = "AUTH_SUCCESS";// 验证成功 
export const EDIT = "EDIT";//编辑
export const CARE = "CARE";//关注
export const ERROR_MSG = "ERROR_MSG";// 错误信息
export const CLEAN_MSG = "CLEAN_MSG";// 清除信息

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
                if( res.status === 200 && res.data.code === 0 ){
                    dispatch({type : LOGIN, msg : "Login Success"})
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
                if (res.status === 200 && res.data.code === 0) {
                    // 过滤掉pwd
                    dispatch(authSuccess(res));
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
        payload: payload
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
    console.log("改变用户信息",change_data);
    return {
        type : EDIT,
        change_data
    }
}
// 关注用户
export function user_care(uid){
    console.log("我关注了",uid);
    return {
        type : CARE,
    }
}