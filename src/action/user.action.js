
import axios from 'axios';

export  const LOGIN = "LOGIN";
// export  const AUTH_SURE = "AUTH_SURE";
export const REGISTER = "REGISTER";

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
