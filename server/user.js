const express = require('express');
const utility = require('utility');
const Router = express.Router();

const model = require('./model');
const User = model.getModel('user');//建立user模型

const filter = { pwd: 0, __v: 0 };// 设置mongoose返回的数据过滤掉那些是不需要返回的

//获取用户列表
Router.get('/list',function(req,res){
    // User.remove({}).exec(); 
    // 获取参数
    console.log(req.query==null?1:0);
    const {type} = req.query;
    User.find({type:type},filter,function(err,doc){
        if(err){
            console.log(err);
        }else{
           res.json({code:0,data:doc});
        }
    })
})
// 用户注册
Router.post('/register',function(req,res){
    const {userName,pwd,type} = req.body;
    
    
    User.findOne({userName},function(err,doc){
        if(doc){
             return res.json({code: 1,msg:"用户名已存在！"})
        }
        new User({ userName,type,pwd:md5(pwd) }).save(function(err,doc){
             if (err) {
                return   res.json({ code: 1, msg: "注册失败" });
            } else {
                res.cookie("user_id", doc._id);
                return res.json({ code: 0, data: doc, msg: "注册成功" });
            }
        });
    })
})
// 用户登录
Router.post('/login',function(req,res){
    const {userName,pwd} = req.body;
    User.findOne({userName,pwd:md5(pwd)},filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"系统出错！"})
        }else if(doc){
            // 返回一个cookies
            res.cookie("user_id",doc._id);
            return res.json({code:0,data:doc,msg:"登录成功"});
        }else{
            return res.json({code:1,msg:"用户名不存在或者密码错误！"})
        }
    })
})
// 用户更新数据
Router.post('/update',function(req,res){
    const {user_id} = req.cookies;
    const body = req.body;
    if(!user_id){
        return res.json({code:1});
    }
    User.findByIdAndUpdate(user_id,body,function(err,doc){
        if(err){
            console.log(err);
            return res.json({ code: 1, msg: "保存失败！" })
        } else {
            // 返回一个cookies
            const data = Object.assign({},{
                user : doc.user,
                type : doc.type
            },body);
            return res.json({ code: 0, data: data, msg: "保存成功" });
        }
    })
})
// 用户信息
Router.get('/info',function(req,res){
    // console.json(req);
    const {user_id} = req.cookies ;
    if(!user_id){
        return res.json({code:1});
    }else{
        User.findOne({_id:user_id},filter,function(err,doc){
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


function md5(C){
    // 通过加盐来时md5明文更加复杂，阻止被暴力破解
    const salt = "YB_STUDY_REACT"
    return utility.md5( utility.md5(C+salt) );
}