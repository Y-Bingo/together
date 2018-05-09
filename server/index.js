const express = require('express');
const bodyParser = require('body-parser');// post请求的中间件
const cookieParser = require('cookie-parser'); // cookei中间件
const io = require('socket.io');
const c = require("./colorConfig");

const app = express();
 
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/scrap',require('./scrap'));// 使用爬虫
app.use('/user', require('./user'));//使用有关/user的请求
app.use('/topic',require('./topic'));//使用topic的相关请求
app.use('/comment', require('./comment'));//使用comment的相关请求
app.use('/user_care', require('./user_care'));//使用user_care的相关请求

app.get('/',function(req,res){
    res.send('<h1>Hello World!</h1>');
})


app.listen(9527,function(){
    console.log(c.log("\n-------------分割线---------------\n"))    
    console.log("Node server listen 9527!");
    console.log(c.log("\n-------------分割线---------------\n"))
})