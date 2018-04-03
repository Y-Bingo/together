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
            com_id: 1,// 评论ID
            com_topic: {// 是在哪个活动中评论的
                tid: 1, // 活动ID
                topic_title: "活动1" // 活动标题
            },
            com_dec: "活动1的第一个评论",//评论的主要内容
            com_from: {//评论来之谁
                user_name: "user1", // 评论人的名字
                uid: 1 // 评论人的id
            },
            com_time: "2018/02/1",//评论时间
        },
        {
            com_id: 2,// 评论ID
            com_topic: {// 是在哪个活动中评论的
                tid: 1, // 活动ID
                topic_title: "活动1" // 活动标题
            },
            com_dec: "活动1的第二个评论",//评论的主要内容
            com_from: {//评论来之谁
                user_name: "user2", // 评论人的名字
                uid: 2 // 评论人的id
            },
            com_time: "2018/02/1",//评论时间
        },
        {
            com_id: 3,// 评论ID
            com_topic: {// 是在哪个活动中评论的
                tid: 1, // 活动ID
                topic_title: "活动1" // 活动标题
            },
            com_dec: "活动1的第三个评论",//评论的主要内容
            com_from: {//评论来之谁
                user_name: "user3", // 评论人的名字
                uid: 3 // 评论人的id
            },
            com_time: "2018/02/1",//评论时间
        }
    ]
};


export default function comment(state = initState, action) {
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
