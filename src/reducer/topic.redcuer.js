// action
import * as Action from '../action/topic.action';
const initState = {
    isLoad:true , // 是否重新渲染页面
    loadMore: true , // 是否后去更多的数据了
    pageIndex : 0 , // 当前浏览到第几页
    topic_data : [
        {
            is_good : false,
            is_collect:true,
            is_join:false,
            is_care:false,
            good_nums: 1,
            // collect_nums : 33,
            comment_nums: 1,
            menber_nums: 1
        },
        {
            is_good: true,
            is_collect: false,
            is_join: true,
            good_nums: 2,
            // collect_nums : 33,
            comment_nums: 2,
            menber_nums: 2
        }
    ]
};


export default function topic(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case Action.GOOD:
            return {...state,...orthers};
        case Action.COLLECT:
            return {...state,...orthers};
        case Action.LOADMORE : {
            const newData = orthers.payLoad;
            const oldData = state.topic_data;
            console.log(newData,oldData);
            return { ...state, topic_data: newData.concat(oldData)};
        }
        default:
            return state;
    }
}