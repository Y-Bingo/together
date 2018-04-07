import React, {Component} from 'react';
import {connect} from 'react-redux';
import {} from  "axios"
import {
    NavBar,
    Icon,
    List,
    WhiteSpace,
    InputItem,
    Button
} from 'antd-mobile'

import CommentCard from '../component/comment_card';
import {publishComment} from "../action/comment.action";
const style = {
    content:{
        margin: "45px 0 40px "
    },
    publish : {
        position: "fixed",
        zIndex: 9999,
        bottom: 0,
        width: "100%"
    }
}

const Extra = () => (
    <div>
        <Button type="ghost" size="small">发送</Button>
    </div>
)

class CommentPage extends Component{
    constructor(){
        super();
        this.state = {
            comData : [
                {
                    com_id: 1,// 评论ID
                    com_topic: {// 是在哪个活动中评论的
                        tid: 1, // 活动ID
                        topic_title: "活动1" // 活动标题
                    },
                    com_dec: "活动1的第一个评论",//评论的主要内容
                    com_from: {//评论来之谁
                        user_name: "user1", // 评论人的名字
                        uid: 1 // 评 论人的id
                    },
                    com_time: "2018/02/1",//评论时间
                },
                {
                    com_id: 2,// 评论ID
                    com_topic: {// 是在哪个活动中评论的
                        tid: 1, // 活动ID
                        topic_title: "活动1" // 活动标题
                    },
                    com_dec: "活动1的第二个评论",//评论的主要内容
                    com_from: {//评论来之谁
                        user_name: "user2", // 评论人的名字
                        uid: 2 // 评论人的id
                    },
                    com_time: "2018/02/3",//评论时间
                },
                {
                    com_id: 3,// 评论ID
                    com_topic: {// 是在哪个活动中评论的
                        tid: 1, // 活动ID
                        topic_title: "活动1" // 活动标题
                    },
                    com_dec: "活动1的第三个评论",//评论的主要内容
                    com_from: {//评论来之谁
                        user_name: "user3", // 评论人的名字
                        uid: 3 // 评论人的id
                    },
                    com_time: "2018/02/4",//评论时间
                }
            ],
            
            placeholder: "请输入评论",// 输入框的placeholder
            myComment: "", // 这是评论的内容
            replyTo: {},// 回复的对象
            com_id: 0// 回复评论的id
        }
        
    }
    componentDidMount(){
        // 请求评论数据
        // this.setState({
        //     comData : this.props.data
        // });
    }
    // 监听点击 ，@某人
    onClickHandle = (com_id, com_to_user) => {
        this.setState({ 
            myComment: `@${com_to_user.user_name} `,
            replyTo : {
                user_name: com_to_user, // 收到评论人的名字
                uid:  2// 收到评论人的id
            },
            com_id : com_id // 回复的评论的ID
        })
    }
    // 监听输入
    onChangeHandle = (val)=>{
        this.setState({
            myComment : val
        })
    }
    // 发布评论
    onPublisComment= ()=>{
        // 发布，提交请求
        let url = this.state.replyTo ? 'publish' : 'reply' ;// 判断这是评论还是回复 
        let publishData = this.state.com_id ? this.rtnReplyData() : this.rtnCommentData();
        console.log("将要发布的数据为：",publishData);
        //在这里发送请求


        // 清空要发布的评论
        this.setState({
            placeholder: "请输入评论",// 输入框的placeholder
            myComment: "", // 这是评论的内容
            replyTo: {},// 回复的对象
            com_id: NaN// 回复评论的id
        });
    }
    rtnReplyData = () =>{ // 返回回复的提交数据
       let rep_dec = getComment(this.state.myComment);
       return {
           com_id: this.state.com_id,// 评论id
           rep_dec: rep_dec,//回复的内容
           rep_from: { // 回复来自谁
               user_name: this.props.user.user_name, // 评论人的名字
               uid: this.props.user.uid // 评论人的id
           },
           rep_to: { // 回复谁的评论
               ...this.state.replyTo
           },
           rep_time: new Date().getTime(),// 回复的时间
       }
    }
    rtnCommentData = () => { // 返回评论的提交数据
        let path = this.props.location.pathname.split("/");
        let tid = path[path.length - 1]; // 获取路径上的评论ID
        let com_dec = getComment(this.state.myComment);
        return {
            com_topic: {// 是在哪个活动中评论的
                tid: tid, // 活动ID
            },
            com_dec: com_dec,//评论的主要内容
            com_from: {
                user_name: this.props.user.user_name, // 评论人的名字
                uid: this.props.user.uid // 评论人的id
            },//评论来之谁,
            com_time: new Date().getTime(),//评论时间
        }
    }

    render(){
        // let addReplyTo = this.addReplyTo;
        let _this = this ;
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={
                        <Icon type="left"/>
                    }
                    onLeftClick = {()=>{this.props.history.goBack()}}
                    className="my-tab-bar"
                    >评论页</NavBar> 
                <WhiteSpace />
                <div style={style.content}  >
                    {
                        this.state.comData.map( (item, index) => (
                                <CommentCard handleClick={this.onClickHandle} comment={item} key={item.com_id}/>
                        ),this)
                    }
                </div>
                <div style={style.publish}>
                    {this.props.user.uid ? 
                        <List  >
                            <InputItem
                                placeholder={this.state.placeholder}
                                value={this.state.myComment}
                                onChange={this.onChangeHandle}
                                extra={<a onClick={this.onPublisComment} className='comment-pulish'>发送</a>}
                            />
                        </List> :
                        null 
                    }
                   
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = () => {
    return ({
    })
}
const mapStateToProps = (state) => {
    return ({
        comData: state.comment,
        user: state.user
    })
}
const getComment = (comment) => {
    // return comment.
    let spaceIndex = comment.indexOf(" ");
    return comment.substr(spaceIndex + 1);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);