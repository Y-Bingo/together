const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const UserCare = Model.getModel("topic");//建立模型

// 路由主api测试
Router.get('/', (res, req, err) => {
    res.send('这是topic');
})

module.exports = Router; 