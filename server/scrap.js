const express =require("express");
const superagent = require("superagent");
const cheerio = require("cheerio");
const promise = require("bluebird");

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
                     let data = resp.data ;
                     res.send(data);
                    //  写入数据, 文件不存在会自动创建
                     fs.writeFile(__dirname + '/test' + '.json', JSON.stringify(data), function (err) {
                         if (err) throw err;
                         console.log('写入完成');
                     });
                    //  res.send("请求成功");
                 }
                 res.end();
              })
})

Router.get("/detail", (req,res) => {
    fs.readFile(__dirname + '/test' + '.json', "utf8",(err,data) =>{
        if(err) throw err ;
        // res.send(data);
        data = JSON.parse(data) ;
        // console.log();
        res.send(data)
    })
})


module.exports =  Router ;

function getUrl(date=3,page_num=1){

    let keyword = null ;
    let has_fd = 0 ;
    let city_id = 440100;
    let tag_id = null ;
    let search_type = 2 ;
    let free_type = "none" ;
    let page_limt = 30 ;
    let params = {date, keyword, page_num, has_fd, city_id, tag_id,search_type,page_num,free_type, page_limt}
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
        for( i in params){
            console.log(i);
            paramsArr.push(`${i}=${params[i]}`);
        }
        return baseUrl.concat(paramsArr).join("?");
    return {
        url : baseUrl ,
        params : paramsArr 
    }
}

function matchMyData(){
    // "node_id": 6381018,
    // "node_type": "event",
    // "title": "5月9日到22日土耳其",
    // "created_at": "2018-04-27",
    // "gather_date": 0,
    // "begin_date": "2018-05-09",
    // "end_date": "2018-05-22",
    // "days": 14,
    // "fee_type": "AA",
    // "event_status": "recruiting",
    // "event_state": "recruiting",
    // "member_limit": 4,
    // "member_num": 1,
    // "from": {
    //     "city_id": 440100,
    //         "name": "广州",
    //             "slug": "guangzhou"
    // },
    // "to": [
    //     {
    //         "dest_id": 203,
    //         "dest_name": "土耳其",
    //         "dest_cat": "country",
    //         "node_slug": "turkey"
    //     }
    // ],
    //     "banner": {
    //     "photo_path": "images/event/v2/no_pic2",
    //         "photo_ext": "jpg"
    // },
    // "leader_user": {
    //     "nick_name": "immideng",
    //         "user_name": "immideng",
    //             "user_id": "ef16e03c2dc86f228dc056d8142178a4",
    //                 "internal_id": 3030949,
    //                     "avatar": "http://c1.zdb.io/files/faces/5/1/51f3f764e.jpg"
    // },
    // "tags": [
    //     {
    //         "tag_name": "旅行",
    //         "tag_id": 14
    //     }
    // ],
    // "image": "http://c1.zdb.io/images/event/v2/no_pic2.jpg"
}
