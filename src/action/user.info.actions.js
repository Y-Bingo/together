import axios from 'axios';
import { list } from 'postcss';
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

const initState = {
    list_type : "",// l列表类型
    data:[]
}
//  commonListData: [], // 公共模块的数据块
//      care: [], // 用户关注的人
//      user_collection: [], // 用户关注的活动
//      user_msg: [], // 用户消息
//      user_publish: [], //用户发布过的活动
//      user_join: [] // 用户参加过的活动
  
export default function user_info(state=initState,action){
    const {type,list_type, data} = action;
    switch (type) {
        case USER_INFO_SEARCH:
            return {...state} ;
        case GET_DATA:
            return {...state,data:data }
        case CARE:
            let {care_to} = action

            console.log(state["data"]);
            let newData = state["data"].map(item => {
                item.is_care = item.care_to.uid == care_to.uid ? !item.is_care : item.is_care ;  
                return item ;
            })
            return {...state, data : newData}
        default:
            return state;
    }
}

export const userInfoSearch = (info_type,id) =>{
    console.log("user,info,search",info_type);
    return {
        type : USER_INFO_SEARCH,
        data : []
    }
}
// 获取用户关注的信息
export function getData(url,type){ 
    // 在这里请求数据
    return (dispatch) => {
        axios.get(url,{})
            .then( res => {
                if (res) {
                    if(res.status === 200 && res.data.code ){
                        let {data} = res.data ;// 取出数据
                        dispatch({type : GET_DATA ,list_type: type, data});
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
export function userCare(care_to){ // 这个uid是被关注的人的uid
    // 发送请求修改
    return (dispatch) => {
        axios.post("/user_care/care", {...care_to})
            .then( res => {
                if (res) {
                    if(res.data.code ){
                        let {data} = res.data ;// 取出数据
                        care_to.is_care = false ;
                        dispatch({ type : CARE, care_to:care_to});
                    }else{
                        console.error("获取不到用户关注的的人的数据");
                    }
                }
            }).catch(err => {
                console.error('请求数据失败',err);
            })
    }
}