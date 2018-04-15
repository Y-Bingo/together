import axios from 'axios';
import { Toast } from 'antd-mobile';

axios.defaults.withCredentials = true;

// 拦截请求
axios.interceptors.request.use( config => {
    Toast.loading('Loading...');
    return config ;
})

// 拦截响应
axios.interceptors.response.use( config => {
    // setTimeout(() => {
        Toast.hide();
    // }, 2000);
    return config;
})