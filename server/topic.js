const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const topic = Model.getModel("topic");//建立模型

// 路由主api测试
Router.get('/', (req, res , err) => {
    res.send('这是topic');
})
// 进入详情页
Router.get('/des/:tid' , (req,res, err) => {
    var tid = req.params.tid
    topic.find ({ tid }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, data: doc });
        }
        return res.json({ code: 0, msg: "找不到当前的主题详情" });
    });
});
// 编辑 post
Router.post("/topic/edit/:tid" ,(req,res) => {
    const {} = req.body ; // 提取请求的元素
}); 
// 删除topic 
Router.get("/topic/del/:tid", (req,res, err)=> {
    
});
//参加该活动
Router.get("/topic/join/:tid" , (req, res, err) => {
    
});

module.exports = Router; 