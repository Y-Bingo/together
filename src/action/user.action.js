export  const LOGIN = "LOGIN";
// export  const AUTH_SURE = "AUTH_SURE";
export const REGISTER = "REGISTER";


export function login(){
    return {
        type :  LOGIN,
        msg : "login success"
    }
}

export function register(){
    return {
        type :  REGISTER,
        msg : "register success"
    }
}