// action
import * as Action from '../action/comment.action';
// com_topic: { type: String, require: true },//评论在哪个活动
// com_dec: { type: String, require: true },//评论的主要内容
// com_from: { type: String, require: true },//评论来之谁
// com_to: { type: String,default: "" } ,//评论给谁
// com_time: { type: Date,default: Date.now },//评论时间
const initState = {
    commentList:[
        {
            com_topic: '001',
            com_dec: "这是第一条评论 ",
            com_from : {
                user_name: 'yb',
                user_head: "boy",
                
            },
            com_to: "002",
            com_time: new Date().getSeconds(),
            tid: "t001",
        }
    ],
};


export default function topic(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case Action.PUBLISH: //直接在这里添加一条信息
            return {...state,...orthers};
        case Action.DELETE:
            return {...state,...orthers};
        case Action.REPLY : {
            return {...state,...orthers};
        }
        case Action.WATCH : {
            console.log("观看评论");
            return {state, ...orthers}
        }
        default:
            return state;
    }
}
