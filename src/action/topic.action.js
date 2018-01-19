export const PUBLISH = "PUBLISH";// 发布主题
export const DELECT = "DELECT" ;//删除主题
export const LOADMORE = "LOADMORE" ;//加载更多
export const GOOD = "GOOD";//点赞主题
export const COLLECT = "COLLECT";//收藏主题
export const JOIN = "JOIN";//加入

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
//收藏
export function join(is_join) {
    return {
        type: COLLECT,
        is_join: !is_join
    }
}

// 加载更多
export function loadMore(){
    return {
        type : LOADMORE,
        payLoad: [{
            is_good: true,
            is_collect: true,
            is_join: true,
            is_care: true,
            good_nums: 3,
            // collect_nums : 33,
            comment_nums: 3,
            menber_nums: 3
        }]
    }
}
