import axios from 'axios';

export const PUBLISH = "PUBLISH";// 发布主题
export const DELECT = "DELECT" ;//删除主题
export const LOADTOPIC = "LOADTOPIC" ;//加载更多
export const GOOD = "GOOD";//点赞主题
export const COLLECT = "COLLECT";//收藏主题
export const JOIN = "JOIN";//加入

const initState = {
    isLoad:true , // 是否重新渲染页面
    LoadMore: true , // 是否后去更多的数据了
    pageIndex : 0 , // 当前浏览到第几页
    topic_data : []
};

export default function topic(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case GOOD:
            return {...state,...orthers};
        case COLLECT:
            return {...state,...orthers};
        case LOADTOPIC : {
            const newData = orthers.data;
            const oldData = state.topic_data;
            console.log("在这里合并新旧主题的信息", oldData.concat(newData) );
            return { ...state, topic_data: oldData.concat(newData) };
        }
        default:
            return state;
    }
}


//发布主题
export function publishTopic(is_collect) {
    return {
        type: COLLECT,
        is_collect: !is_collect
    }
}
//删除主题
export function delectTopic(is_collect) {
    return {
        type: COLLECT,
        is_collect: !is_collect
    }
}
// 加载更多
export function loadTopic() {
    let url = "http://localhost:3000/data/user_info_collect.json";
    if(!initState.topic_data || initState.LoadMore){  // 只能是在没有数据的时候才请求数据，或者LOADTOPIC = true时， 不然就不加载任何数据
        // 在这里请求数据
        return (dispatch) => {
            axios.get(url,{})
                .then( res => {
                    if (res) {
                        if(res.status === 200 ){
                            let {data} = res ;// 取出数据

                            dispatch({type : LOADTOPIC ,data :data["topic_data"].concat([])});
                            console.log("在这里获取到了主题信息",data["topic_data"]);
                        }else{
                            console.error("获取不到用户关注的的人的数据");
                        }
                    }
                }).catch(err => {
                    console.error('请求数据失败:' , err);
                })
            }
    }else{
        return {

        }
    }
   
   
}
//点赞
export function good(is_good){
    return {
        type : GOOD,
        is_good : ! is_good
    }
}
//收藏
export function collect(is_collect){
    return {
        type : COLLECT,
        is_collect : !is_collect
    }
}
//加入
export function join(is_join) {
    return {
        type: COLLECT,
        is_join: !is_join
    }
}


