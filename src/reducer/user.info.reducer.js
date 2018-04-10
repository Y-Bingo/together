import * as ActionTypes from '../action/user.info.actions';

const initState = {
    commonListData : [] ,// 公共模块的数据块
    user_care : [], // 用户关注的人
    user_collection : [], // 用户关注的活动
    user_msg : [] ,// 用户消息
    user_publish : [] ,//用户发布过的活动
    user_join : [] // 用户参加过的活动
}
 
export default function user_info(state=initState,action){
    const {type, data} = action;
    switch (type) {
        case ActionTypes.USER_INFO_SEARCH:
            return {...state} ;
        case ActionTypes.GET_DATA :
            console.log("getDATA",data);
            return {...state,commonListData:data}
        default:
            return state;
    }
}