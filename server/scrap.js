// require('./colorConfig');// 引入彩色输出配置

const express = require("express");
const superagent = require("superagent");
const cheerio = require("cheerio");
const promise = require("bluebird");

const c = require('./colorConfig'); // 控制台彩色模块

var csv = require('node-csv').createParser();


const Router = express.Router();
//获得文件系统模块  
const fs = require('fs');
//基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；  
const xlsx = require('node-xlsx');

var page_num = 3;
var pages = [];
Router.get('/', (req, res) => {
    res.send(getUrl());
    res.end();
});

Router.get("/getIndex", (req, res) => {

    for (var i = 1; i <= page_num; i++) {
        getJSON(i).then(() => {
            pages.push("page" + i);
            console.log(c.log("第" + i + "个数据采集完了"));
            res.send(page);
        }); // 获取主页json 并写入
        // .then( ()=>{
        //     console.log(c.log("第"+i+"个数据采集完了"));
        //     pages.push("page"+i);
        // });
    }

})

Router.get("/detail", (req, res) => {
    let Url = [];
    // promise.all( )
    for (var i = 1; i < page_num; i++) {
        console.log(c.log("开始提取网站"));
        (readFile("page" + i, "json").then(page => {
            // map数据
            page.forEach((item) => {
                let url = `http://www.doyouhike.net/event/yueban/detail/${item.node_id}`;
                console.log("page" + i, c.success(url))
                Url.push(url)
            })
        }))(i);
    }
    res.send(Url);
})

Router.get("/csv", (req, res) => {
    csv.mapFile(`${__dirname}/data/test.csv`, function (err, data) {

        console.log(data); //Outputs: [ { id: '1', user: 'foo', pass: 'bar' } ]
        res.send(data);
    });
})



function matchMyData(data) {
    let topic_data = {};
    let user_data = {};
    let tap_data = {};
    return writeFile("topic");
}

function matchTopic(data) {

}

function matchUser(data) {
    return {
        uid: data.internal_id, //  这是一个用户ID
        user_name: data.user_name, //用户名
        user_pwd: "123456", //用户密码
        user_creat_time: new Date(), // 创建时间
        user_age: "不详", //年龄
        user_sex: Math.random() > 0.5 ? "boy" : "girl", //性别
        user_city: "广州", //所在城市
        user_head: data.avatar, // 头像
        user_touch: "该用户暂时没有留下任何联系方式",
        user_signatrue: "这个用户很懒，什么都没留下", //用户签名
        user_love_topic: [ //用户喜爱的活动类型
            "all"
        ]
    }
}

function matchComment(data) {
    return {
        tid: data.node_id, // 这是一个主题id
        topic_title: data.title, //活动标题
        topic_dec: data.dec, //活动内容,
        topic_type: [...data.tags], //活动类型，判断这是哪种类型的活动
        topic_from: { //活动发起人，
            uid: data.leader_user.internal_id, // 用户ID
            user_name: data.leader_user.user_name, // 用户名 
            user_head: data.leader_user.avatar, // 用户头像
        },
        topic_face: "all", // 活动主要面向人群
        topic_photo: data.image, //活动的活动图片,
        topic_create_time: data.created_at, //活动的开始时间
        topic_begin_time: data.begin_date, //活动的开始时间
        topic_during_time: data.gather_date, //活动持续时间
        topic_end_time: data.end_date, //活动报名的截止时间
        topic_place: {
            type: String,
            default: null
        }, //活动的地点，
        topic_num: data.member_limit, // 活动预计参加人数
        topic_menber: [ // 活动参加成员
            // {
            //     uid: Number, // 用户ID
            //     user_name: String, // 用户名
            //     user_head: String, // 用户头像
            // }
        ],
        topic_had_join: [], // 该活动参加的人 // 用数组来存在用户ID，indexOf查询用户ID
        topic_money: "free", //活动预算
        topic_love: 0, //被点赞数
        topic_collected: 0, //被收藏数
        topic_comments: 0, //被评论数
    }
}

function matchTap(data) {

}

function matchCollection(data) {

}

function getUrl(page_num = 1, date = 5) {
    // let date= 3;
    let keyword = null;
    let has_fd = 0;
    let city_id = null;
    let tag_id = null;
    let search_type = 1;
    let free_type = "none";
    let page_limt = 30;
    let params = {
        date,
        keyword,
        page_num,
        has_fd,
        city_id,
        tag_id,
        search_type,
        page_num,
        free_type,
        page_limt
    }
    let baseUrl = ["http://www.doyouhike.net/event/yueban/index_list"];

    let paramsArr = [];
    for (i in params) {
        paramsArr.push(`${i}=${params[i]}`);
    }
    return baseUrl.concat(paramsArr).join("?");
    return {
        url: baseUrl,
        params: paramsArr
    }
}
// 获取详情页的JSON
function getJSON(page_num, date) {
    let url = getUrl(page_num, date);
    return new Promise((resolve, reject) => {
        superagent.get(url).set('Content-Type', 'application/json')
            .end((err, response) => {
                if (err) {
                    console.log(url, c.error("请求失败", err));
                    reject();
                } else {
                    let text = response.text;
                    let resp = JSON.parse(text);
                    let data = resp.data.data;
                    writeFile("page" + page_num, data,resolve);
                }
            })
    })
}

function writeFile(name, newData, callback) { // json
    let path = __dirname + '/data/' + name + '.json';
    let oldData = [];
    if (fs.existsSync(path)) {
        console.log(info("存在该目录"));
        let result = fs.readFileSync(path, "utf8");
        oldData = JSON.parse(result);
    }
    let DATA = oldData.concat(newData);
    fs.writeFile(path, JSON.stringify(DATA), function (err) {
        if (err) {
            console.log(c.error(`读取${name}操作失败`, err))
            throw new Error(err);
        };
        console.log(c.success('写入完成'));
        callback();
    });
}

function readFile(name, type) { //读取文件 jSON
    let path = __dirname + '/data/' + name + '.' + type;
    console.log(c.warn("开始读取文件"))
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(c.error(`读取${name}操作失败`, err))
                reject(err);
            };
            // res.send(data);
            let array = JSON.parse(data);
            resolve(array)
        })
    })
}



module.exports = Router;