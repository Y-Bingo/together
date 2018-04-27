const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const UserCare = Model.getModel("care");//建立模型

// 关注
Router.post('/care',(req,res,err) => {
    console.log("关注");
});
Router.post("/uncare",(req,res,err)=>{
    console.log("不关注了");
})

// 关注列表
Router.get('/list/:user_id',(req, res, err) => {
    console.log("关注列表");
    res.json(req.params.user_id);
})

// 路由主api测试
Router.get('/', (req, res, err) => {
    res.send('这是user_care');
})

module.exports = Router; 