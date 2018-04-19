import axios from 'axios';

export const PUBLISH = "PUBLISH";// 发布主题
export const DELECT = "DELECT" ;//删除主题
export const LOADTOPIC = "LOADTOPIC" ;//加载更多
export const LOADDEC = "LOADDEC" ;// 进入详情页
export const GOOD = "GOOD";//点赞主题
export const COLLECT = "COLLECT";//收藏主题
export const JOIN = "JOIN";//加入

const initState = {
    isLoad:true , // 是否重新渲染页面
    LoadMore: true , // 是否后去更多的数据了
    pageIndex : 0 , // 当前浏览到第几页
    topic_data : [],
    cur_topic: "tid",//当前的主题
    topic_dec: {
        is_good: true, // 是否点赞了
        is_collect: false, // 是否收藏了
        is_join: true, //是否参加了
        good_nums: 2, // 点赞数
        collect_nums: 33, //收藏人数
        comment_nums: 2, // 评论数
        menber_nums: 66, // 成员数量
        topic_title: "默认标题",
        topic_dec: "默认内容这是,默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是",
        topic_type: "默认活动类型",
        topic_from: "id",
        topic_from_touch: "6666666",
        topic_photo: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        topic_create_time: "开始时间",
        topic_during_time: "2H",
        topic_end_time: "开始时间+持续时间",
        topic_place: "工学一号楼，234教师",
        topic_menber: 5,
        topic_had_join: 2,
        topic_money: 0,

        user_head: "head-boy",
        user_name: "bingo",
    }// 当前进入的主题的详细信息
};

export default function topic(state = initState, action) {
    const {type,data,callback,...others} = action;
    switch (type) {
        case GOOD:
            return {...state,...others};
        case COLLECT:
            return {...state,...others};
        case LOADTOPIC : {
            const newData = data;
            const oldData = state.topic_data;
            console.log("在这里合并新旧主题的信息", oldData.concat(newData) );
            return { ...state, topic_data: oldData.concat(newData) };
        }
        case LOADDEC : {
            let {tid} = others ;
            let dec = {};
            for( topic of state.topic_data){
                if(topic.tid == tid){
                    dec = topic ;break;
                }
            }
            console.log("dec",dec);
            return {...state,topic_des : {...dec}}
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
    let url = "http://localhost:3000/data/topic.json";
    if(!initState.topic_data || initState.LoadMore){  // 只能是在没有数据的时候才请求数据，或者LOADTOPIC = true时， 不然就不加载任何数据
        // 在这里请求数据
        return (dispatch) => {
            axios.get(url,{})
                .then( res => {
                    if (res) {
                        if(res.status === 200 ){
                            let {data} = res ;// 取出数据
                            dispatch({type : LOADTOPIC ,data :data["topic_list"].concat([])});
                            console.log("在这里获取到了主题信息",data["topic_data"]);
                        }else{
                            throw new Error("获取不到用户关注的的人的数据")
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
// 加载详情页
export function intoDec(tid, callback) {
    // let tid = tid ;
    let url = "http://localhost:3000/data/topic.json" ;
    console.log("这里开始请求主题详情数据啊");

    return {
        type : LOADDEC,
        tid :tid
    }
    // return (dispatch) => {
        
    //     axios.get(url, {})
    //         .then(res => {
    //                 if (res.status === 200) {
    //                     let { data } = res;// 取出数据
    //                     let dec = {};// 详情页内容
    //                     for (let item of data) {
    //                         if (item.tid === tid) {
    //                             dec = item;
    //                             break;
    //                         }
    //                     }
    //                     dispatch({ type: LOADDEC, data: dec, callback });
    //                     console.log("在这里获取到了主题信息", data["topic_data"]);
    //                 } else {
    //                     throw new Error("获取不了主题详细内容");
    //                 }
    //         }).catch(err => {
    //             console.error('请求数据失败:', err);
    //         })
    // }
    
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


