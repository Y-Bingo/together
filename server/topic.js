const express = require('express');
const Router = express.Router();

const model = require('./model'); //这是一个modules对象
const moment = require('moment');

const Topic = model.getModel("topic");//建立模型
const Tags = model.getModel('topic_type'); // 标签
const Collect = model.getModel("collect") ;// 收藏模块
// 这种方式一般用于数据上传，需要中间件connect - multiparty的支持
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// 路由主api测试,需要传入page
Router.get('/list', (req, res ) => {
    let {page} = req.params ;
    let limit = 10 ;
    Topic.find({}).skip((page-1) * limit).limit(limit).sort({"topic_create_time":-1})
        .exec((err, doc) => {
            if (err) {
                res.json({ code: 0, msg: "找不到当前的主题详情" });
            } else {
                res.json({ code: 1, data: doc });
            }

        })
})

Router.post('/publish', (req, res) => {
    let topic = req.body ;
    topic.topic_create_time = moment().format("YYYY-MM-DD HH:mm:ss");
    topic.tid = Math.floor(Math.random() * 10000000 ) ;
    topic.topic_place = JSON.parse(topic.topic_place);
    topic.topic_type = JSON.parse(topic.topic_type) ;
    topic.topic_from = JSON.parse(topic.topic_from);
    menber = topic.topic_from ; // 发起人用户
    menber.join_date = moment().format("YYYY-MM-DD HH:mm:ss");
    topic.topic_menber = [menber];
    topic.topic_love = 0
    topic.topic_collected = 0;
    topic.topic_comments = 0 ;
    let newTopic = new Topic(topic);
    newTopic.save((err,doc)=>{
        if(err){
            console.log(err);
            return res.json(falseRep("发布主题失败"));
        }else{
            return res.json(SuccessRep(doc,"发布主题成功"));
        }
    });
})

Router.get('/search/:key', (req,res)=>{
    let {key} = req.params ;
    let _filter = {
        $or: [
            { topic_title: { $regex: key } },
            {topic_dec: {$regex: key}},
            { topic_from: { user_name: { $regex: key }}}
        ]
    } 
    Topic.find(_filter, (err, doc) => {
        if (err) {
            console.warn(err);
            return res.json(falseRep("没有"));
        } else {
            return res.json(SuccessRep(doc, "查找成功"));
        }
    })

})


// Router.get() 


// 编辑 post
Router.post("/edit/:tid", (req, res) => {
    const { } = req.body; // 提取请求的元素
}); 

// 进入详情页
Router.get('/des/:tid' , (req,res, err) => {
    var tid = req.params.tid
    Topic.find ({ tid }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, data: doc });
        }
        return res.json({ code: 0, msg: "找不到当前的主题详情" });
    });
}); 
//参加该活动
Router.post('/join/:tid',(req,res, err)=>{
    console.log('请求加入活动')
    let {tid} = req.params ;
    let {join} = req.body ; // 
    let user = {uid,user_name,user_head} = req.body ;
    Topic.findOne({tid},(err, doc)=>{
        let topic = doc ;
        if(join==="true"){
            user.join_date = moment().format("YYYY-MM-DD HH:mm:ss");
            topic.topic_menber.push(user);
            Topic.update({tid:topic.tid},{$set:{topic_menber:topic.topic_menber}},(err)=>{
                if(err){
                    return res.json(falseRep("操作失败"));
                }else{
                    return res.json(SuccessRep(null,'加入成功')) ;
                }
            })
        }else{
             let topic_menber = topic.topic_menber.filter( item =>{
                 return user.uid != item.uid 
             });
             Topic.update({ tid: topic.tid }, { $set: { topic_menber: topic_menber } }, (err) => {
                 if (err) {
                     return res.json(falseRep("操作失败"));
                 } else {
                     return res.json(SuccessRep(null, '退出成功'));
                 }
             })
        }
    })
    
})

// 删除topic 
Router.get("/del/:tid", (req, res, err) => {
      
});

Router.get("/good/:tid",(req,res,err)=>{
    let {tid} = req.params ;
    Topic.findOne({tid},(err,doc)=>{
        console.log(doc);
        Topic.update({tid:doc.tid},{$set:{topic_love:++doc.topic_love}}, err =>{
            if(err){
                console.log(err);
                return res.json(falseRep("操作失败"));                
            }else {
                return res.json(SuccessRep(null, '点赞成功'));
            }
        })
    })
})

Router.get("/collect",(req,res,err) =>{
    let { tid, uid, is_collected} = req.query ;
    let collect =  {tid,uid}
    if (is_collected === "false"){ // 取消点赞
        Collect.remove({tid,uid},(err,doc)=>{
            if (err) {
                return res.json(falseRep("操作失败"));
            } else {
                return res.json(SuccessRep(doc, '取关'));
            }
        })
    }else {
        collect.collect_id = Math.floor(Math.random() * 1000);
        collect.collect_time = moment().format("YYYY-MM-DD HH:mm:ss");
        let data = new Collect(collect);
        data.save((err) => {
            if (err) {
                console.log(err);
                return res.json(falseRep("收藏失败"));
            } else {
                return res.json(SuccessRep(null, "收藏主题成功"));
            }
        })
    }
   
})

// Router.get()

function SuccessRep(data,msg="")  {
    return {
        code : 1 ,
        data: data,
        msg :msg
    }
}

function falseRep(msg="") {
    return {
        code : 0 ,
        msg : msg
    }
}

module.exports = Router; 