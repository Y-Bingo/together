const express = require('express');
const Router = express.Router();
const Model = require('./model'); //这是一个modules对象
const UserCare = Model.getModel("care");//建立模型
const moment = require('moment'); // 常用时间模块
// 关注
Router.post('/care',(req,res,err) => {
    console.log('user_care/care');
    let care_from = {uid, user_name, user_head } = req.cookies ;
    let care_to = {uid, user_name, user_head } = req.body ;
    UserCare.findOne({"care_from.uid":care_from.uid,"care_to.uid":care_to.uid},(err,doc)=>{
        if(doc){
            doc.remove((err)=>{
                return res.json(SuccessRep(doc, '取消关注'));
            })
        }else{
            let user_care = {care_from,care_to};
            user_care.care_id = Math.floor(Math.random() * 10000000) ;
            user_care.care_time = moment().format("YYYY-MM-DD HH:mm:ss");
            new UserCare(user_care).save((err, doc)=>{
                if (doc)  return res.json(SuccessRep(doc, '关注成功'));
                return res.json(falseRep(null, '操作失败'));
            })
        }
    })
});
// 关注列表  
Router.get('/list',(req, res, err) => {
    console.log("user_care/list");
    let {uid} = req.cookies ;
    UserCare.find({"care_from.uid":uid}, (err, doc)=>{
        let data = doc.map( item =>{
            item.is_care = true ;
            return item ;
        })
        return res.json(SuccessRep(data, '关注列表'));
    });
})

// 路由主api测试
Router.get('/', (req, res, err) => {
    res.send('这是user_care');
})
// Router.get()
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