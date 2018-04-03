  import React, {Component} from 'react';
import {connect} from 'react-redux';
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
                        uid: 1 // 评论人的id
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
            ]
        }
    }
    componentDidMount(){
        // 请求评论数据
        // this.setState({
        //     comData : this.props.data
        // });
    }
    onClickHandle = () => {
        console.log("click");
    }
    onChangeHandle = (val)=>{
        this.setState({
            myComment : val
        })
    }
    onPublisComment= ()=>{
        let myComment = this.state.myComment;
        // 清空要发布的评论
        this.setState({
            myComment : ""
        });
        this.props.publishComment({myComment});
    }
    addReplyTo = (evt) => {
        console.log(evt.target.key);
    }
    render(){
        // let addReplyTo = this.addReplyTo;
        let _this = this ;
        this.addReplyTo = this.addReplyTo.bind(this);
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
                                <CommentCard onClick={this.addReplyTo} comment={item} key={item.com_id}/>
                        ),this)
                    }
                </div>
                <div style={style.publish}>
                    <List  >
                        <InputItem
                            placeholder="输入你的评论"
                            value = {this.state.myComment}
                            onChange={this.onChangeHandle}
                            extra={<a  onClick={this.onPublisComment} className='comment-pulish'>发送</a>}
                        />
                    </List>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = () => {
    return ({
        publishComment
    })
}
const mapStateToProps = (state) => {
    return ({
        comData: state.comment
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);