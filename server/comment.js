const express = require('express');
const Router = express.Router();
const monent = require('moment');


const Model = require('./model'); //这是一个modules对象
const Com = Model.getModel("comment");// 评论
const Topic = Model.getModel('topic');//  主题 

// 评论发布
Router.post('/publish',(req,res,err) => {
    let {com_dec,tid} = req.body ;
    let com_to = {uid, user_name, user_head} = req.body ;
    let com_from =  {uid, user_name, user_head} = req.cookies ;
    let com_time = monent().format("YYYY-MM-DD HH:mm:ss");
    let com_id = Math.floor(Math.random()*10000000);
    new Com({com_id, tid, com_dec, com_from, com_to, com_time}).save((err, doc) => {
        if(err){
            console.log("评论发布不成功");
        }else{
            console.log("评论发布成功");
            return res.json({code : 0 , data : doc });
        }
    });
    // 主题中的评论数 + 1 
    Topic.update({tid},{$inc:{topic_comments:1}},  err =>{
        if(err) {
            console.warn("操作失败！");
        }else {
            console.info("操作成功！");
        }
    })
});

// 评论列表-活动主题
Router.get('/list/:tid?',(req,res,err)=>{
    let {tid} = req.params ;
    let {uid} = req.cookies ;
    if(tid){ // 如果存在tid则获取主题评论列表
        Com.find({tid},(err, doc)=>{
            if(err){
                return res.json(falseRep("获取主题评论列表失败"))
            }else{
                return res.json(doc, SuccessRep("获取主题列表成功"))    
            }
        })
    }else{
        Com.find({"com_from.uid":uid},(err, doc)=>{
            if(err){
                return res.json(falseRep("获取用户评论列表失败"))
            }else{
                return res.json( SuccessRep(doc,"获取用户列表成功"))    
            }
        })
    }

});





// 路由主api测试
Router.get('/',(req,res,err) => {
    res.send('这是coment');
});

// 成功返回的请求
function SuccessRep(data, msg = "") {
    // let {_v,_id, ...res} = data
    return {
        code: 1,
        data: data,
        msg: msg
    }
}
// 失败返回的请求
function falseRep(msg = "") {
    return {
        code: 0,
        msg: msg
    }
}

module.exports = Router; 