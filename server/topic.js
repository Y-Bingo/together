const express = require('express');
const Router = express.Router();

const model = require('./model'); //这是一个modules对象
const moment = require('moment'); 

const Topic = model.getModel("topic");//建立模型
const Tags = model.getModel('topic_type'); // 标签
const Collect = model.getModel("collect") ;// 收藏模块
const UserCare = model.getModel("care"); // 用户关注模块
// 这种方式一般用于数据上传，需要中间件connect - multiparty的支持
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// 路由主api测试,需要传入page
Router.get('/list/:page', (req, res ) => {
    console.log("topic/list get");
    let {page} = req.params ;
    let {uid} = req.cookies ; // 重cookies提取用户ID
    let limit = 10 ;
    let user_collect = [];
    Topic.find({}).skip((page-1) * limit).limit(limit).sort({"topic_create_time":-1})
                    .exec((err, topics) => {
                    if (err) {
                        res.json({ code: 0, msg: "找不到当前的主题详情" });
                    } else {
                        // let data = doc.map(item=>{
                        //     item.is_collected = user_collect.some(item2=> item2 == item.tid)
                        //     item.is_join = item.topic_menber.some(item2=> item2.uid == uid) ;
                        //     return item ;
                        // })
                         isCollect(topics, uid).then(topics => {
                             res.json(SuccessRep(topics, '收藏的活动'));
                         })
                    //     res.json({ code: 1, data: data });
                    }
                })
    // Collect.find({uid},(err,doc)=>{
    //     if(err){
    //         console.log("错误");
    //     }else{
    //         user_collect = doc.map((item)=>(item.tid)); // 取出用户收藏的模块
            
    //     }
    // })
})
// 搜索
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
// 进入详情页
Router.get('/des', (req, res, err) => {
    console.log('topic/des get')
    let {tid} = req.query;
    Topic.find({ tid }, (err, doc) => {
        if (doc) {
            return res.json({
                code: 1,
                data: doc
            });
        }
        return res.json({
            code: 0,
            msg: "找不到当前的主题详情"
        });
    });
});

// 发布
Router.post('/publish', (req, res) => {
    let topic = req.body ;
    let topic_from = {uid,user_head, user_name} = req.cookies ;
    
    topic.topic_create_time = moment().format("YYYY-MM-DD HH:mm:ss");
    topic.tid = Math.floor(Math.random() * 10000000 ) ;
    topic.topic_place = JSON.parse(topic.topic_place);
    topic.topic_type = JSON.parse(topic.topic_type) ;
    topic.topic_from = topic_from;
    menber = topic_from ; // 发起人用户
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
// 收藏
Router.post("/collect",(req,res,err) =>{
    let { topic,tid, is_collected} = req.body ;
    let {uid} = req.cookies ;
    let collect =  {tid,uid,topic}
    if (is_collected !== "false"){ // 取消点赞
        Collect.remove({tid,uid},(err,doc)=>{
            if (err) {
                return res.json(falseRep("操作失败"));
            } else {
                return res.json(SuccessRep(doc, '取关'));
                
            }
        })
         Topic.update({tid},{$inc:{topic_collected:-1}}, err => {
                    if(err){
                        console.warn("收藏自减失败")
                    }else{
                        console.log("收藏自减成功");
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
        Topic.update({tid},{$inc:{topic_collected:1}}, err => {
            if(err){
                console.warn("收藏自增失败")
            }else{
                console.log("收藏自增成功");
            }
        })
    }
   
})
//参加该活动
Router.post('/join/:tid',(req,res, err)=>{
    console.log('请求加入活动')
    let {tid} = req.params ;
    let {is_join} = req.body ; // 
    let user = {uid,user_name,user_head} = req.cookies ;
    Topic.findOne({tid: tid,"topic_menber":{"$elemMatch":{"uid":uid}}},(err,topic)=>{
        if(topic){ // 存在则证明已经参加了该活动
            let topic_menber = topic.topic_menber.filter( item =>{
                return user.uid != item.uid 
            });
            topic.topic_menber = topic_menber ;
           Topic.findOneAndUpdate({tid},{"topic_menber":topic_menber},(err,doc)=>{
                 if (err) {
                    return res.json(falseRep("操作失败"));
                } else {
                    return res.json(SuccessRep(doc, '退出成功'));
                }
            });
        }else{
            user.join_date = moment().format("YYYY-MM-DD HH:mm:ss");
            
            Topic.findOneAndUpdate({tid},{$push:{topic_menber:user}},(err,doc)=>{
                if (err) {
                    return res.json(falseRep("操作失败"));
                }else{
                    return res.json(SuccessRep(doc,'加入成功')) ;
                }
            })
        }
    })
})
// 获取用户发过的活动
Router.get('/publish', (req,res)=>{
    console.log("topic publish get")
    let topic_from = {uid,user_head, user_name} = req.cookies ;
    Topic.find({"topic_from.uid":uid}, (err,topics)=>{
        if(err){
            return res.json(falseRep("获取用户发发布过的互动失败"));
        }else {
             isCollect(topics, uid).then(topics => {
                 res.json(SuccessRep(topics,'获取发布过的活动'));
             })
        }
    })
})
// 用户参与过的活动
Router.get('/join',(req,res)=>{
    console.log("topic/join get")
    let {uid} = req.cookies ;

    Topic.find({"topic_menber":{"$elemMatch":{"uid":uid}}}, (err, doc) => {
        if (err) {
            return res.json(falseRep("获取参加过的活动失败"));
        } else {
            return res.json(SuccessRep(doc, '参加的活动'));
        }
    })
})
// 用户收藏
Router.get('/collect',(req,res)=>{
    console.log("topic/collect get");
    let {uid} = req.cookies ;

    Collect.find({uid}).populate("topic").exec( (err, doc) => {
        if (err) {
            return res.json(falseRep("收藏的活动失败"));
        } else {
            let topics = doc.map( item =>{
                return item.topic
            })
            isCollect(topics,uid).then(topics=>{
                 res.json(SuccessRep(topics, '收藏的活动'));
            })
           
        }
    })
})


// 删除topic 
Router.get("/del/:tid", (req, res, err) => {
     
});
// 点赞 +
Router.post("/good",(req,res,err)=>{
    console.log('topic/good post');
    let {tid} = req.body ;
    Topic.update({tid},{$inc:{topic_love:1}}, err => {
        if(err){
            return res.json(falseRep("点赞操作失败"))
        }else{
            return res.json(SuccessRep(null, "点赞成功"))
        }
    })
})


// 编辑 post
Router.post("/edit/:tid", (req, res) => {
    const {} = req.body; // 提取请求的元素
});

function isJoin(data,uid){ // 判断用户是不是已经参与了该活动 data[]
    return data.map(item => {
        item.is_join = item.topic_menber.some(item2 => item2.uid == uid);
        return item;
    })
}

function isCare(data,uid){// 判断用户是否已经关注了该用户
    let care_from_id = uid ;
    return new Promise( resolve =>{
        UserCare.find({"care_from.uid": care_from_id}, (err, doc) =>{
            data = data.map( item =>{
                item.is_care = false;
                for(let i = 0 ; i<doc.length; i++){
                    if( doc[i].care_to.uid == item.topic_from.uid ){
                        item.is_care = true ;
                        break ;
                    }
                }
                return item ;                
            })
            resolve(data);
        })
    })
}

function isCollect(data, uid){
   return new Promise((resolve, reject) => {
                Collect.find({uid}, (err, doc) => {
                    user_collect = doc.map((item) => (item.tid)); // 取出用户收藏的模块
                    data = isJoin(data,uid);
                    data = data.map(item => {
                        item.is_collected = user_collect.some(item2 => item2 == item.tid);
                        return item;
                    })
                    isCare(data,uid).then( result =>{
                        resolve(result );
                    })
                    
                })
            });
}

// Router.get()
// 成功返回的请求
function SuccessRep(data,msg="")  {
    return {
        code : 1 ,
        data: data,
        msg :msg
    }
}
// 失败返回的请求
function falseRep(msg="") {
    return {
        code : 0 ,
        msg : msg
    }
}

module.exports = Router; 