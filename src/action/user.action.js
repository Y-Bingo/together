
import axios from 'axios';

export  const LOGIN = "LOGIN";
// export  const AUTH_SURE = "AUTH_SURE";
export const REGISTER = "REGISTER";//登录
export const EDIT = "EDIT";//编辑
export const CARE = "CARE";//关注

// 登录
export function login(){
    console.log("我登录")
    return {
        type :  LOGIN,
        msg : "login success"
    }
}
// 注册
export function register(){
    console.log("我注册了")
    return {
        type :  REGISTER,
        msg : "register success"
    }
}
// 编辑
export function user_info_edit(change_data){
    console.log("改变用户信息");
    return {
        type : EDIT,
        change_data
    }
}
// 关注用户
export function user_care(uid){
    console.log("我关注了");
    return {
        type : CARE,
    }
}