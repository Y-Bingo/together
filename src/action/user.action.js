export  const LOGIN = "LOGIN";
export  const AUTH_SURE = "AUTH_SURE";

export function login(){
    return {
        type :  LOGIN,
        msg : "login success"
    }
}