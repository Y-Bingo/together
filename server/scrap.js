const express =require("express");
const superagent = require("superagent");
const cheerio = require("cheerio");
const promise = require("bluebird");
const Model = require('./model'); //这是一个modules对象

const Router = express.Router();
//获得文件系统模块  
const fs = require('fs');
//基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；  
const xlsx = require('node-xlsx');

Router.get('/',(req, res)=>{
    res.send( getUrl() );
    res.end(); 
});

Router.get("/getIndex", (req,res)=>{
    let url = getUrl();
    console.log(url);
    superagent.get(url)
              .set('Content-Type', 'application/json')
              .end( (err, response) => {
                 if (err) {
                     res.send(err);
                 }else{
                     let text = response.text ;
                     let resp = JSON.parse(text);
                     let data = resp.data.data ;
                    
                  
                    
                    //  写入数据, 文件不存在会自动创建
                    //  fs.writeFile(__dirname + '/test' + '.json', JSON.stringify(data.data), function (err) {
                    //      if (err) throw err;
                    //      console.log('写入完成');
                    //  });
                    //  res.send("请求成功");
                 }
                 res.end();
              })
})

Router.get("/detail", (req,res) => {
    fs.readFile(__dirname + '/test' + '.json', "utf8",(err,data) =>{
        if(err) throw err ;
        // res.send(data);
        let json = JSON.parse(data) ;
        let topics = json;
        // console.log();
        let id = 6358403;
        let topic = {} ;
        superagent.get("http://www.doyouhike.net/event/yueban/detail/6358403")
                   .end((err, response) => {
                let html = response.text;
                var $ = cheerio.load(html);
                topic.dec = $(".event-ct").html();
                $("#cmtList").find("li").each( (item)=>{
                    console.log("li",item.html());
                });
        
                       res.send($("#cmtList").html());
        })
        // res.send(topics)
        console.log(topic);
    })
})


module.exports =  Router ;

function matchMyData(data){
    let topic_data = {} ;
    let user_data = {} ;
    let tap_data = {} ;
    return writeFile("topic");
}

function writeFile(name) { // 写入文件
    let path = __dirname + "/data/" + name + ".json" ;
    let oldData = [] ;
    if( fs.existsSync(path) ) {
        let result = fs.readFileSync(path, "utf8")
        oldData = JSON.parse(result);
    }
    // let collection =  Model.getModel(name);
    // collection.insert(oldData) ;
    return oldData ;
}

function matchTopic(data) {

}

function matchUser(data) {
    return  {
        uid: data.internal_id ,//  这是一个用户ID
        user_name: data.user_name,//用户名
        user_pwd: "123456",//用户密码
        user_creat_time: new Date(), // 创建时间
        user_age: "不详",//年龄
        user_sex: Math.random() > 0.5 ?"boy" : "girl",//性别
        user_city: "广州",//所在城市
        user_head: data.avatar, // 头像
        user_touch: "该用户暂时没有留下任何联系方式",
        user_signatrue: "这个用户很懒，什么都没留下",//用户签名
        user_love_topic: [//用户喜爱的活动类型
           "all"
        ]
    }
}

function matchComment(data) {
    return  {
        tid: data.node_id, // 这是一个主题id
        topic_title: data.title,//活动标题
        topic_dec: data.dec,//活动内容,
        topic_type: [...data.tags],//活动类型，判断这是哪种类型的活动
        topic_from: {//活动发起人，
            uid: data.leader_user.internal_id,// 用户ID
            user_name: data.leader_user.user_name, // 用户名 
            user_head: data.leader_user.avatar,// 用户头像
        },
        topic_face: "all", // 活动主要面向人群
        topic_photo: data.image ,//活动的活动图片,
        topic_create_time: data.created_at,//活动的开始时间
        topic_begin_time: data.begin_date,//活动的开始时间
        topic_during_time: data.gather_date ,//活动持续时间
        topic_end_time: data.end_date,//活动报名的截止时间
        topic_place: { type: String,default: null },//活动的地点，
        topic_num: data.member_limit,// 活动预计参加人数
        topic_menber: [ // 活动参加成员
            // {
            //     uid: Number, // 用户ID
            //     user_name: String, // 用户名
            //     user_head: String, // 用户头像
            // }
        ],
        topic_had_join : [],// 该活动参加的人 // 用数组来存在用户ID，indexOf查询用户ID
        topic_money : "free",//活动预算
        topic_love: 0,//被点赞数
        topic_collected: 0,//被收藏数
        topic_comments: 0,//被评论数
    }
}

function matchTap (data) {

}

function matchCollection(data) {

}

function getUrl(date = 3, page_num = 1) {

    let keyword = null;
    let has_fd = 0;
    let city_id = 440100;
    let tag_id = null;
    let search_type = 2;
    let free_type = "none";
    let page_limt = 30;
    let params = { date, keyword, page_num, has_fd, city_id, tag_id, search_type, page_num, free_type, page_limt }
    let baseUrl = ["http://www.doyouhike.net/event/yueban/index_list"];
    // let paramsArr = {
    //     date: 3 ,
    //     key_word: null ,
    //     page_num: 1 ,
    //     has_fd: 0 ,
    //     city_id: 440100 ,
    //     tag_id: null ,
    //     search_type: 2 ,
    //     page_limit: 30 ,
    //     fee_type: "none"
    // };
    let paramsArr = [];
    for (i in params) {
        console.log(i);
        paramsArr.push(`${i}=${params[i]}`);
    }
    return baseUrl.concat(paramsArr).join("?");
    return {
        url: baseUrl,
        params: paramsArr
    }
}
