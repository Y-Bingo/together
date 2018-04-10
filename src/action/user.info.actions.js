import axios from 'axios';
// export const USER_CARE = "USER_CARE";
// export const USER_COLLECTION = "USER_COLLECTION";
// export const USER_JOIN = "USER_JOIN";
// export const USER_MSG = "USE_MSG";
// export const USER_PUBLISH = "USER_PUBLISH";
export const USER_INFO_SEARCH = "USER_INFO_SEARCH";
export const CARE = "CARE";//关注
export const GET_USER_CARE = "GET_USER_CARE";
export const GET_TOPIC_COLLECTION = "GET_TOPIC_COLLECTION"; // 收藏
export const GET_TOPIC_PUBLISH = "GET_TOPIC_PUBLISH"; //发布
export const GET_TOPIC_JOIN = "GET_TPOPIC_JOIN" ;// 参与
export const GET_DATA = "GET_DATA"; // 获取数据

export const userInfoSearch = (info_type,id) =>{
    console.log("user,info,search",info_type);
    return {
        type : USER_INFO_SEARCH,
        data : []
    }
}
// 获取用户关注的信息
export function getData(url){ // 这个是当前用户的uid
    // 在这里请求数据
    return (dispatch) => {
        axios.get(url,{})
            .then( res => {
                if (res) {
                    if(res.status === 200 ){
                        let {care_data} = res.data ;// 取出数据
                        dispatch({type : GET_DATA ,data : care_data.concat([])});
                    }else{
                        console.error("获取不到用户关注的的人的数据");
                    }
                }
            }).catch(err => {
                console.error('请求数据失败');
            })
    }
   
}
// 关注用户
export function userCare(uid){ // 这个uid是被关注的人的uid
     
    return {
        type : CARE,

    }
}