const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/together");

const model = {
    // 用户
    user : {
        uid: {"type":Number,require:true} ,//  这是一个用户ID
        user_name : {"type":String, require:true},//用户名
        user_pwd : {"type":String, require:true},//用户密码
        user_creat_time : {"type":Date, default:Date.now}, // 创建时间
        user_age : {type:Number, default:0},//年龄
        user_sex : {type:String, enum:["boy","girl"]},//性别
        user_city : {type:String, default:"广东工业大学"},//所在城市
        user_head : {type :String, default:'boy'}, // 头像
        user_touch : {//用户的联系方式
            QQ : {type:String, default: ""},
            tel: {type:Number, default: 110}
        },
        user_signatrue : {type:String, default:"这个用户很懒，什么都没留下"},//用户签名
        user_love_topic : [//用户喜爱的活动类型
            {
                topic_type : String // 类型
            }
        ]
        
    },
    // 活动主题
    topic :{
        tid : {"type":Number,require: true}, // 这是一个主题id
        topic_title : {type:String,require:true},//活动标题
        topic_dec : {type:String,require:true},//活动内容,
        topic_type : {topic:Array,default:["ALL"]},//活动类型，判断这是哪种类型的活动
        topic_from : {//活动发起人，
            uid:        {type:String, require:true},// 用户ID
            user_name : {type: String ,require:true}, // 用户名 
            user_head : {type : String ,require:true},// 用户头像
            user_touch: { type: String, default: "你没有留下任何联系方式" },//用户的联系方式
        },
        topic_face: {type: String ,default:["All"]}, // 活动主要面向人群
        topic_photo : {type:Array} ,//活动的活动图片,
        topic_create_time : {type:Date,default:Date.now},//活动的开始时间
        topic_begin_time : {type:Date,default:Date.now},//活动的开始时间
        topic_during_time : {type:String,default:"1h"},//活动持续时间
        topic_end_time : {type:Date,require:true},//活动报名的截止时间
        topic_place : {type:String,default:null},//活动的地点，
        topic_num : {type: Number,defalult : 0},// 活动预计参加人数
        topic_menber : [ // 活动参加成员
            {
                uid: Number, // 用户ID
                user_name: String, // 用户名
                user_head: String, // 用户头像
            }
        ],
        topic_had_join : {type:Number,default:0},//活动已经参与的人数
        topic_money :    {type:String,defalut:"0元"},//活动预算
        topic_love :     {type:Number,default:0},//被点赞数
        topic_collected :{type:Number,default:0},//被收藏数
        topic_comments : {type:Number,default:0},//被评论数
    },
    // 活动类型
    tap :{ 
        tap_id : Number , // 类型ID
        tap_type: String  // 类型名
    },
    // 评论
    comment : {
        com_id : Number ,// 评论ID
        com_topic: {// 是在哪个活动中评论的
            tid: Number , // 活动ID
            topic_title: String // 活动标题
        },
        com_dec :  {type:String,require:true},//评论的主要内容
        com_from : {
            user_name : String , // 评论人的名字
            uid : Number // 评论人的id
        },//评论来之谁,
        com_time : {type:Date,default:Date.now},//评论时间
    },
    // 回复
    reply: {
        rep_id: Number,// 评论ID
        com_id: Number ,// 评论id
        rep_dec: String,//回复的内容
        rep_from: {
            user_name: String, // 评论人的名字
            uid: Number // 评论人的id
        },//评论来之谁
        rep_to: {
            user_name: String, // 收到评论人的名字
            uid: Number // 收到评论人的id
        },
        rep_time: { type: Date, default: Date.now },// 回复的时间
    },
    // 关注
    care : {  // 用户关注
        care_id : {type: Number, require:true}, // 关注ID
        care_from : {
            uid : Number,// 用户ID
            user_name: String,// 用户名
        }, //关注发起人
        care_to: { //被关注的人
            uid : Number,
            user_name : String ,//用户名
        }
    },
    // 收藏
    collect : { // 收藏 
        collect_id : {type:Number, require:true}, // ID 
        user : { //
            uid : String , // 收藏用户的ID
            user_name: String //收藏用户的名字
        },
        topic :{
            tid: {type: Number, require:true},  // 被收藏的主题ID
            topic_title: String , // 收藏的标题
        }
    },
    // 推荐
    recommend :{ // 推荐给用户的主题
        rid: {type: Number, require: true },// 推荐ID
        uid: { type: Number, require: true },// 用户ID
        topics: [
            {
                tid: { "type": Number, require: true }, // 这是一个主题id
                topic_title: { type: String, require: true }//活动标题
            }
        ]
    }
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