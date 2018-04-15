const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const UserCare = Model.getModel("topic");//建立模型

// 路由主api测试
Router.get('/', (req, res   , err) => {
    res.send('这是topic');
})
// 进入详情页
Router.get('/topic/des/:tid', (req,res, err) => {

});
// 编辑 post
Router.post("/topic/edit/:tid" ,() => {

});
// 删除topic 
Router.get("/topic/del/:tid", (req,res, err)=> {

});
//参加该活动
Router.get("/topic/join" , (req, res, err) => {

});

module.exports = Router; 