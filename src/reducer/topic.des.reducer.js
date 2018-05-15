// topic_title: { type: String, require: true },//活动标题
// topic_dec: { type: String, require: true },//活动内容,
// topic_type: { topic: Array,default: ["ALL"] },//活动类型，判断这是哪种类型的活动
// topic_from: { type: String, require: true },//活动发起人，
// topic_from_touch: { type: String },//活动发起人的联系方式
// topic_photo: { type: Array } ,//活动的活动图片,
// topic_create_time: { type: Date,default: Date.now },//活动的开始时间
// topic_begin_time: { type: Date,default: Date.now },//活动的开始时间
// topic_during_time: { type: String,default: "1h" },//活动持续时间
// topic_end_time: { type: Date, require: true },//活动报名的截止时间
// topic_place: { type: String,default: null },//活动的地点，
// topic_menber: { type: Number,default: null },//该活动的预计参加人数
// topic_had_join: { type: Number,default: 0 },//活动已经参与的人数
// topic_money: { type: String, defalut: "0元" },//活动预算

// topic_love: { type: Number,default: 0 },//被点赞数
// topic_collected: { type: Number,default: 0 },//被收藏数
// topic_comments: { type: Number,default: 0 },//被评论数

import * as Action from '../action/topic.action';
const initState = {
    is_good: true, // 是否点赞了
    is_collect: false, // 是否收藏了
    is_join: true, //是否参加了
    good_nums: 2, // 点赞数
    collect_nums : 33, //收藏人数
    comment_nums: 2, // 评论数
    menber_nums: 66, // 成员数量
    topic_title : "默认标题", 
    topic_dec: "默认内容这是,默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是，默认内容这是",
    topic_type : "默认活动类型",
    topic_from : "id",
    topic_from_touch : "6666666",
    topic_photo: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    topic_create_time : "开始时间",
    topic_during_time : "2H",
    topic_end_time : "开始时间+持续时间",
    topic_place : "工学一号楼，234教师",
    topic_menber : 5 ,
    topic_had_join : 2 ,
    topic_money : 0,

    user_head : "head-boy",
    user_name : "bingo",
};

export default function  des(state =  initState , action ) {
    const { type, ...orthers } = action;
    switch ( type ) {
        default:
            return state
    }
}