const express = require('express');
const Router = express.Router();

const model = require('./model'); //这是一个modules对象
const Topic = model.getModel("topic");//建立模型
const Tags = model.getModel('topic_type');

// 路由主api测试,需要传入page
Router.get('/list', (req, res ) => {
    let {page} = req.query ;
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

// Router.get() 


// 编辑 post
Router.post("/topic/edit/:tid", (req, res) => {
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
Router.get("/topic/join/:tid" , (req, res, err) => {
    
});

// 删除topic 
Router.get("/topic/del/:tid", (req, res, err) => {

});

module.exports = Router; 