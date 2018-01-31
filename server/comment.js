const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const Com = Model.getModel("comment");//建立模型

// 评论发布
Router.post('/publish',(req,res,err) => {
    const {com_topic ,com_dec, com_from, com_to, com_time} = req.body ;
    // 是否是回复
    // 判断com_to
    new Com({ com_topic, com_dec, com_from, com_to, com_time}).save((err, doc) => {
        if(err){
            console.log("评论发布不成功");
        }else{
            console.log("评论发布成功");
            return res.json({code : 0 , data : doc });
        }
    })
});

// 评论列表-活动主题
Router.get('/list/:topic_id',(req,res,err)=>{
    console.log("评论列表", req.params.topic_id);
    res.json(req.params.topic_id);
});



// 路由主api测试
Router.get('/',(req,res,err) => {
    res.send('这是coment');
});

module.exports = Router; 