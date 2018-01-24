
import axios from 'axios';

export  const LOGIN = "LOGIN";
// export  const AUTH_SURE = "AUTH_SURE";
export const REGISTER = "REGISTER";
export const EDIT = "EDIT";

// 登录
export function login(){
    return {
        type :  LOGIN,
        msg : "login success"
    }
}
// 注册
export function register(){
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