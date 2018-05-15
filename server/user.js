const express = require('express');
const utility = require('utility');
const moment = require('moment');

const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');//建立user模型

const filter = { user_pwd: 0, __v: 0 };// 设置mongoose返回的数据过滤掉那些是不需要返回的

//获取用户列表
Router.get('/list',function(req,res){
    console.log("server", "list");
    // User.remove({}).exec(); 
    User.find({},function(err,doc){
        if(err){
            console.log(err);
        }else{
        //    let payData = filter(doc); 
           res.json({code:0,data:doc});
        }
    })
})
// 用户注册
Router.post('/register',function(req,res){
    console.log("server", "register");
    const {user_name, user_pwd} = req.body;

    User.findOne({user_name},function(err,doc){
        if(doc){
             return res.json({code: 0,msg:"用户名已存在！"})
        } 
        let user = { user_name, user_pwd: user_pwd } ;
        user.uid = Math.floor(Math.random() * 10000000) ;
        user.create_time = moment().format("YYYY-MM-DD HH:mm:ss");
        new User(user).save(filter,function(err,doc){
             if (err) {
                return res.json(falseRep("注册失败"))
            } else {
                setCookie(res,doc);
                return res.json(SuccessRep(doc, "注册成功"));
               
            }
        });
    })
})
// 用户登录
Router.post('/login',function(req,res){
    console.log("server","login");
    const {user_name,user_pwd} = req.body;
    User.findOne({user_name,user_pwd: user_pwd},filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"系统出错！"})
        }else if(doc){
            // 返回一个cookies
            setCookie(res,doc)
            return res.json(SuccessRep(doc,"登录成功"));
        }else{
            return res.json(falseRep("用户名不存在或者密码错误"))
        }
    })
})
// 用户更新数据 ！！！待定
Router.post('/update',function(req,res){
    console.log("server", "update");
    const {uid} = req.cookies;
    const body = req.body;
    if(!uid){
        return res.json({code:1});
    }
    User.update({uid},body,function(err){
        if(err){
            console.log(err);
            return res.json({ code: 0, msg: "保存失败！" })
        } else {
            // 返回一个cookies
            setCookie(res, body)
            return res.json({ code: 1, data: body, msg: "保存成功" });
        }
    })
})
// 用户信息 待定没测试
Router.get('/info',function(req,res){
    console.log("server", "user-info");
    // console.json(req);
    const {uid} = req.cookies ; // 重cookies提取用户ID
    if(!uid){
        return res.json({code:1});
    }else{
        User.findOne({uid},filter,function(err,doc){
            if(err){
                return res.json({ code: 1 ,msg:err});                
            }else{
                return res.json({ code: 0, data:doc});                
            }
        })
    }
})
// 路由测试
Router.get('/',function(req,res){
    res.send("这是user漏油");
})

module.exports = Router;

// function filter(data, filters = ["user_pwd","__v"]){
//     const {...filter, ...pureData } = data;
//     return pureData; 
// }
function SuccessRep(data, msg = "") {
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
function setCookie(res,doc){
    res.cookie("uid", doc.uid);
    res.cookie("user_name",doc.user_name);
    res.cookie("create_time", doc.create_time);
    res.cookie("user_age", doc.user_age);
    res.cookie("user_sex", doc.user_sex);
    res.cookie("user_head", doc.user_head);
    res.cookie("user_city", doc.user_head);
    res.cookie("user_signature", doc.user_signatrue);
}
function md5(C){
    // 通过加盐来时md5明文更加复杂，阻止被暴力破解
    const salt = "YB_STUDY_REACT"
    return utility.md5( utility.md5(C+salt) );
}