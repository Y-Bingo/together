const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/together");

const model = {
    user : {
        user_name : {"type":String,"require":true},//用户名
        user_pwd : {"type":String,"require":true},//用户密码
        user_creat_time : {"type":Date,default:Date.now}, // 创建时间
        user_age : {type:Number,default:0},//年龄
        user_sex : {type:String,enum:["boy","girl"]},//性别
        user_city : {type:String},//所在城市
        user_head : {type :String, default:'boy'}, // 头像
        user_touch : {type:String},//用户的联系方式
        user_signatrue : {type:String},//用户签名
        user_love_topic : {type:Array,default:[]},//用户喜爱的活动类型
        
    },
    topic :{
        topic_title : {type:String,require:true},//活动标题
        topic_dec : {type:String,require:true},//活动内容,
        topic_type : {topic:Array,default:["ALL"]},//活动类型，判断这是哪种类型的活动
        topic_from : {type:String,require:true},//活动发起人，
        topic_from_touch : {type:String},//活动发起人的联系方式
        topic_photo : {type:Array} ,//活动的活动图片,
        topic_create_time : {type:Date,default:Date.now},//活动的开始时间
        topic_begin_time : {type:Date,default:Date.now},//活动的开始时间
        topic_during_time : {type:String,default:"1h"},//活动持续时间
        topic_end_time : {type:Date,require:true},//活动报名的截止时间
        topic_place : {type:String,default:null},//活动的地点，
        topic_menber : {type:Number,default:null},//该活动的预计参加人数
        topic_had_join : {type:Number,default:0},//活动已经参与的人数
        topic_money : {type:String,defalut:"0元"},//活动预算

        topic_love : {type:Number,default:0},//被点赞数
        topic_collected : {type:Number,default:0},//被收藏数
        topic_comments : {type:Number,default:0},//被评论数
    },
    comment : {
        com_topic : {type:String,require:true},//评论在哪个活动
        com_dec : {type:String,require:true},//评论的主要内容
        com_from : {type:String,require:true},//评论来之谁
        com_to : {type:String,default:""} ,//评论给谁
        com_time : {type:Date,default:Date.now},//评论时间
    },
    user_care : {
        care_from : String, //关注发起人
        care_to : String,//被关注的人
    },
}

//批量注册模型
for(m in model){
    let schema = new mongoose.Schema(model[m])
    mongoose.model(m , schema);
}

module.exports = {
    getModel : function(model){
        return mongoose.model(model);
    }
}