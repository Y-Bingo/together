// require('./colorConfig');// 引入彩色输出配置

const express = require("express");
const superagent = require("superagent");
const cheerio = require("cheerio");
const promise = require("bluebird");
const moment = require('moment');
const c = require('./colorConfig'); // 控制台彩色模块

var csv = require('node-csv').createParser();


const Router = express.Router();
//获得文件系统模块  
const fs = require('fs');
//基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；  
const xlsx = require('node-xlsx');

var page_num = 5;
var pages = [];
var topicID = [];
let array_u = []; // 用户存储
let array_T = []; // 活动类型存储
Router.get('/', (req, res) => {
    res.send(getUrl());
    res.end();
});

Router.get("/getIndex", (req, res) => {
    for (var i = 1; i <= page_num; i++) {
        ((i) => {
            getJSON(i).then(() => {
                console.log(c.log("第" + i + "个数据采集完了"));
                // res.send(pages);
            }).catch((err) => {
                console.warn(err);
            });
        })(i)
    }
    res.send("");

})

Router.get("/detail", (req, res) => {
    let readFs = [];
    for (let i = 1; i <= page_num; i++) {
        let topic = {
            id: [],
            url: []
        };

        readFs.push(readFile(i, "json"));
        // readFile(page_num, "json").then((data) => {
        //     data.forEach(item => {
        //         let url_d = `http://www.doyouhike.net/event/yueban/detail/${item.node_id}`;
        //         let url_m = `http://www.doyouhike.net/event/yueban/get_event_members?nodeId=${item.node_id}&userId=&page_num=1&page_limit=16`;;
        //         let url_c = {
        //             url: "http://www.doyouhike.net/event/yueban/get_more_comment",
        //             from_data: {
        //                 nodeId: item.node_id,
        //                 userId: null,
        //                 page: 1,
        //                 commentId: 0,
        //                 page_size: 10,
        //                 order_type: 2,
        //             }
        //         }
        //         superagent.get(url_d) // 请求详细的内容
        //             .end((err, response) => {
        //                 if (err) {
        //                     res.send(err);
        //                     return;
        //                 }
        //                 let $ = cheerio.load(response.text, {
        //                     decodeEntities: false
        //                 });
        //                 //   console.log(res.text);
        //                 data.dec = $(".event-ct").html(); // 详细内容
        //                 data.love = $("#like_num").html() * 1; // 点赞
        //                 data.comments = $(".cmtNum").html() * 1; // 评论

        //                 data.members = [];
        //                 res.json(matchTopic(topic));
        //             })
        //     });

        // })
    }
    Promise.all(readFs).then(result => {
        let task = [] ;

        let array_t = [].concat.apply([], result);
        array_t = array_t.map(topic => {
            array_u.indexOf(topic.leader_user) > -1 ? "" : array_u.push(matchUser(topic.leader_user));
            array_T.indexOf(topic.tags) > -1 ? "" : array_T.push(topic.tags);
            task.push(getMore(topic));
            // return matchTopic(topic);
            return topic ;
        })
        // res.send(array_t);
        Promise.all(task).then( result2 => {
            console.log(array_u);
            res.send(result2);
        }).catch( err => {
            console.log(err);
        })
        Promise.all()
        // 爬取评论
    })
})
Router.get("/comment", (req, res) => {
    let id = 6374444
    let url = `http://www.doyouhike.net/event/yueban/get_event_members?nodeId=${id}&userId=&page_num=1&page_limit=16`;
    let task = [];
    task.push(superagent.get(url).set('Content-Type', 'application/json'));
    // superagent.get(url).set('Content-Type', 'application/json')
    //     .end((err, response) => {
    //         response = JSON.parse(response.data.text);
    //         let user = response.data.menber_list.map(item => matchUser(item))
    //         res.json(user)
    //     })
    // Promise.all(task).then((task_r) => {
    //     // console.log(err);
    //     // console.log(JSON.parse(response.req) )
    //     // console.log(response)
    //     task_r.forEach(response => {
    //         response = JSON.parse(response.text);
    //         let user = response.data.menber_list.map(item => matchUser(item))
    //         res.send(user);
    //     })

    // }).catch(err => {
    //     console.log(err);
    // })
    let topic = 
       {
           "node_id": 6378386,
           "node_type": "event",
           "title": "东南亚 越南-柬埔寨-泰国-缅甸-印度 深度穷游",
           "created_at": "2018-04-11",
           "gather_date": 1525708800,
           "begin_date": "2018-05-08",
           "end_date": "2019-06-23",
           "days": 412,
           "fee_type": "AA",
           "event_status": "recruiting",
           "event_state": "recruiting",
           "member_limit": 4,
           "member_num": 1,
           "from": {
               "city_id": 440100,
               "name": "广州",
               "slug": "guangzhou"
           },
           "to": [{
                   "dest_id": 0,
                   "dest_name": "越南",
                   "dest_cat": "city",
                   "node_slug": ""
               },
               {
                   "dest_id": 0,
                   "dest_name": "柬埔寨",
                   "dest_cat": "city",
                   "node_slug": ""
               },
               {
                   "dest_id": 0,
                   "dest_name": "泰国",
                   "dest_cat": "city",
                   "node_slug": ""
               },
               {
                   "dest_id": 0,
                   "dest_name": "缅甸",
                   "dest_cat": "city",
                   "node_slug": ""
               },
               {
                   "dest_id": 0,
                   "dest_name": "印度",
                   "dest_cat": "city",
                   "node_slug": ""
               }
           ],
           "banner": {
               "photo_path": "images/event/v2/no_pic2",
               "photo_ext": "jpg"
           },
           "leader_user": {
               "nick_name": "ZhongC",
               "user_name": "ZhongCoi05",
               "user_id": "cffc636344b99704d8bf57806bf9e7d8",
               "internal_id": 3172858,
               "avatar": "http://c1.zdb.io/files/faces/none_header.gif"
           },
           "tags": [{
               "tag_name": "旅行",
               "tag_id": 14
           }],
           "image": "http://c1.zdb.io/images/event/v2/no_pic2.jpg"
       }
    getMore(topic).then(
        response => {res.send(response)}
    )



})

function getMore(topic) {
    return new Promise(resolve => {
        let url_d = `http://www.doyouhike.net/event/yueban/detail/${topic.node_id}`;
        let url_m = `http://www.doyouhike.net/event/yueban/get_event_members?nodeId=${topic.node_id}&userId=&page_num=1&page_limit=16`;
        let url_c = {
            url: "http://www.doyouhike.net/event/yueban/get_more_comment",
            from_data: {
                nodeId: topic.node_id,
                userId: null,
                page: 1,
                commentId: 0,
                page_size: 10,
                order_type: 2,
            }
        }
        // task.push(superagent.post(url._c)); // comment
        superagent.get(url_d) // 请求详细的内容
            .end((err, response) => {
                let $ = cheerio.load(response.text, {
                    decodeEntities: false
                });
                //   console.log(res.text);
                topic.dec = $(".event-ct").html(); // 详细内容
                topic.love = $("#like_num").html() * 1; // 点赞
                topic.comments = $(".cmtNum").html() * 1; // 评论
                superagent.get(url_m).end( (err,response2)=>{
                    debugger ;
                    response2 = JSON.parse(response2.text).data;
                    topic.member = response2.menber_list.map( item => {
                        array_u.indexOf(item.user) > -1 ? "" : array_u.push(matchUser(item.user));                        
                        return matchMenber(item) ;
                    }) ;
                    resolve(matchTopic(topic));

                })
            })
        // })
        // Promise.all(task).then(response => {
        //     console.log(response);
        //     resolve(1);
        // })

    })
}

function matchMyData(data) {
    let topic_data = {};
    let user_data = {};
    let tap_data = {};
    return writeFile("topic");
}

function matchComment(data) {

}

function matchUser(data) {
    return {
        uid: data.internal_id, //  这是一个用户ID -
        user_name: data.user_name, //用户名 -
        user_pwd: "123456", //用户密码 x
        user_creat_time: moment().format("YYYY-MM-DD HH:mm:ss"), // 创建时间 -
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

function matchTopic(data) {
    return {
        tid: data.node_id, // 这是一个主题id  -
        topic_title: data.title, //活动标题 -
        // topic_dec: data.dec, //活动内容, x
        topic_type: [...data.tags], //活动类型，判断这是哪种类型的活动 -
        topic_from: { //活动发起人，
            uid: data.leader_user.internal_id, // 用户ID -
            user_name: data.leader_user.user_name, // 用户名 -
            user_head: data.leader_user.avatar, // 用户头像 -
        },
        topic_photo: data.image, //活动的活动图片, -
        topic_create_time: data.created_at, //活动的开始时间 -
        topic_begin_time: data.begin_date, //活动的开始时间 -
        topic_during_time: data.gather_date, //活动持续时间 -
        topic_end_time: data.end_date, //活动报名的截止时间 -
        topic_place: {
            from: data.from.name, // 起始 -
            to: 　data.to[0].dest_name // 结束 -
        },
        topic_num: data.member_limit, // 活动预计参加人数 -
        topic_menber: [ // 活动参加成员 x
            // ...data.member
        ],
        topic_money: data.free_type, //活动预算
        // topic_love: data.love, //被点赞数 x
        topic_collected: 0, //被收藏数 x
        // topic_comments: data.comments, //被评论数 x
    }
}
function matchMenber(data) {
    return {
        uid: data.user.internal_id, // 用户ID
        user_name: data.user.user_name, // 用户名
        user_head: data.user.avatar, // 用户头像
        join_date: data.join_date, // 参见活动的时间
    }
}

function matchTap(data) {

}

function matchCollection(data) {

}

function getUrl(page_num = 1, date = 3) {
    // let date= 3;
    let keyword = null;
    let has_fd = 0;
    let city_id = 440100;
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
    let baseUrl = "http://www.doyouhike.net/event/yueban/index_list?";

    let paramsArr = [];
    for (i in params) {
        paramsArr.push(`${i}=${params[i]}`);
    }
    return baseUrl + paramsArr.join("&");
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
                    console.log(url, c.error("请求失败", err.status));
                    reject(err);
                } else {
                    let text = response.text;
                    let resp = JSON.parse(text);
                    let data = resp.data.data;
                    data.forEach(item => {
                        topicID.push(item.node_id);
                        console.log(`--${page_num}---${item.title}-----${page_num}--`);
                    })
                    writeFile(page_num, data, resolve);
                }
            })
    })
}

function writeFile(name, newData, type, callback) { // json
    let path = __dirname + '/data/' + name + '.' + type;
    // let oldData = [];
    // if (fs.existsSync(path)) {
    //     console.log(c.warn("存在该目录"));
    //     let result = fs.readFileSync(path, "utf8");
    //     oldData = JSON.parse(result);
    // }
    // let DATA = oldData.concat(newData); 
    fs.writeFile(path, JSON.stringify(newData), function (err) {
        if (err) {
            console.log(c.error(`写入《${name}》操作失败`, err))
            throw new Error(c.error("写入操作失败:") + err);
        };
        console.log(c.success('写入完成'));
    });
}

function readFile(name, type) { //读取文件 jSON
    let path = __dirname + '/data/' + name + '.' + type;
    console.log(c.warn(`--开始 读取${path}--`))
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(c.error(`读取《${name}》操作失败`, err))
                reject(err);
            };
            // res.send(data);
            let array = JSON.parse(data);
            console.log(c.warn(`--读取${path} 完毕--`))
            resolve(array)
        })
    })
}



module.exports = Router;