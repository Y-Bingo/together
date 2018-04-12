// action
import * as Action from '../action/topic.action';
const initState = {
    isLoad:true , // 是否重新渲染页面
    loadMore: true , // 是否后去更多的数据了
    pageIndex : 0 , // 当前浏览到第几页
    topic_data : []
};


export default function topic(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case Action.GOOD:
            return {...state,...orthers};
        case Action.COLLECT:
            return {...state,...orthers};
        case Action.LOADMORE : {
            const newData = orthers.data;
            const oldData = state.topic_data;
            console.log(newData,oldData);
            return { ...state, topic_data: newData.concat(oldData)};
        }
        default:
            return state;
    }
}
