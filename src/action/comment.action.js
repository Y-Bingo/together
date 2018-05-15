export const PUBLISH = 'PUBLISH'//发布评论
export const DELETE = "DELETE";// 删除评论
export const REPLY = "REPLY" ;// 回复评论
export const WATCH = "WATCH" ; // 观看评论 ,, 跳转评论页 
export const MORE = "MORE" ;// 查看更多的评论
export const GETCOMMENT = "GETCOMMENT" ;// 获取评论数据

const initState = {
    commentList:[]
};


export default function comment(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case PUBLISH: //直接在这里添加一条信息
            return {...state,...orthers};
        case DELETE:
            return {...state,...orthers};
        case REPLY : {
            return {...state,...orthers};
        }
        case WATCH : {
            console.log("观看评论");
            return {state, ...orthers}
        }
        default:
            return state;
    }
}

// 发布评论
export function publishComment(publishDATA) {
    console.log("发布评论", publishDATA);
    return { type: PUBLISH }
}
// 删除评论
export function deleteComment(deleteDATA) {
    console.log("善删除评论", deleteDATA);
    return { type: DELETE }
}
// 回复评论
export function replyComment(publishDATA){
    console.log("回复评论", publishDATA);
    return { type: REPLY }
}
// 查看更多评论
export function moreComment() {
    return { type: MORE }
}
// 跳转到评论页 ，查看评论
export function watchComment() {
    return { type: WATCH }
}

// 跳转到评论页 ，查看评论
export function getComment() {
    return { 
        type: GETCOMMENT ,
        data: [{},{},{}]
    }
}