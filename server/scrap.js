const express = require("express");
const superagent = require("superagent");
const request = require('request');
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
    }
    Promise.all(readFs).then(result => {
        let task = [];

        let array_t = [].concat.apply([], result);
        array_t = array_t.map(topic => {
            if (JSON.stringify(array_u).indexOf(JSON.stringify(topic.leader_user)) <= -1) {
                array_u.push(matchUser(topic.leader_user))
            };
            if (JSON.stringify(array_T).indexOf(JSON.stringify(topic.tags[0])) <= -1) {
                array_T.push(...topic.tags)
            };
            task.push(getMore(topic));
            // return matchTopic(topic);
            return topic;
        })
        // writeFile('topicD',array_t,'json',()=>{
        //     writeFile("tags",array_T,'json',()=>{
        //         writeFile("user",array_u,'json',()=>{res.send("wancheng")});
        //     })
        // })
        // res.send(array_t);
        Promise.all(task).then(result2 => {
            let idArray = [];
            let topic = [].concat.apply([], result2).map(item => {
                idArray.push(item.node_id);
                return matchTopic(item);

            })
            writeFile("All", topic, "json", () => {
                writeFile("ID", idArray, "json", () => {
                    res.send(topic);
                });
            });

        }).catch(err => {
            console.log(err);
        })
        // Promise.all()
        // 爬取评论
    })
})
Router.get("/comment", (req, res) => {
    let url = "http://www.doyouhike.net/event/yueban/get_more_comment";
    let data = {
        nodeId: 6378544,
        userId: null,
        page: 1,
        commentId: 0,
        page_size: 10,
        order_type: 2
    }
    let task = [];
    // getComment(url,data).then(r =>{
    //     res.send(r);
    // })
    readFile("ID", "json").then(array_id => {
        array_id.forEach(item => {
            data.nodeId = item;
            task.push(getComment(url, data))
        })
        Promise.all(task).then(result => {
            //    result = [].concat.apply([],result);
            res.send(result);
        })

    })
})

function getComment(url, data) {
    setTimeout(() => {
        return new Promise(res => {
            request.post({
                url: url,
                form: data
            }, (err, response) => {
                console.log(c.warn("爬取"), url, c.success("完毕"));
                let body = JSON.parse(response.body);
                let comment = body.data.data;
                comment = comment.map(item => {
                    item.tid = data.nodeId

                    return matchComment(item);
                })
                res(comment);
            })
        })
    }, 1000);
}

function getMore(topic) {

    return new Promise((resolve, reject) => {
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
                let $;
                if (response) {
                    $ = cheerio.load(response.text, {
                        decodeEntities: false
                    });
                } else {
                    reject(url_d, "不能爬取")
                }

                console.log(c.sig(url_d), "爬取完毕");
                //   console.log(res.text);
                topic.dec = $(".event-ct").html(); // 详细内容
                topic.love = $("#like_num").html() * 1; // 点赞
                topic.comments = $(".cmtNum").html() * 1; // 评论
                let start = Math.floor(Math.random() * (array_u.length - 3));
                let end = Math.floor(Math.random() * 3) + start;
                topic.member = array_u.slice(start, end).map(item => {
                    return matchMenber(item);
                })
                resolve(topic)
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
    let content = data.content.reduce((pre, cur, index) => {
        return pre + '<br/>' + cur.content
    }, "");
    let photo_domain_path = "http://c1.zdb.io/";
    return {
        com_id: data.comment_id, // 评论ID
        com_topic: data.tid, // 主题id
        com_dec: content, //评论的主要内容
        com_from: {
            user_name: data.user.user_name, // 评论人的名字
            user_head: photo_domain_path + data.user.avatar, // 评论人头像
            uid: data.user.user_id // 评论人的id
        }, //评论来之谁,
        rep_to: {
            user_name: data.reply_to.user_name, // 收到评论人的名字
            uid: data.reply_to.user_id // 收到评论人的id
        },
        com_time: moment(data.created_at).format("YYYY-MM-DD HH:mm:ss"), //评论时间
    }
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
        user_love_type: [ //用户喜爱的活动类型

        ]
    }
}

function matchTopic(data) {
    return {
        tid: data.node_id, // 这是一个主题id  -
        topic_title: data.title, //活动标题 -

        // topic_dec:"默认内容",
        topic_dec: data.dec, //活动内容, x

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
            ...data.member
        ],
        topic_money: data.free_type, //活动预算

        topic_love: data.love, //被点赞数 x
        // topic_love: 0,

        topic_collected: 0, //被收藏数 x
        topic_comments: data.comments, //被评论数 x
        // topic_comments: 0
    }
}

function matchMenber(data) {
    return {
        uid: data.uid, // 用户ID
        user_name: data.user_name, // 用户名
        user_head: data.avatar, // 用户头像
        join_date: moment().format("YYYY-MM-DD HH:mm:ss"), // 参见活动的时间
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
        callback();
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