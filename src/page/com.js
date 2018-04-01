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
            myComment : ""
        }
    }
    componentDidMount(){
        // 请求评论数据
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
    render(){
        console.log("welcome to commentpage");
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
                <div style={{margin:"45px 0 15px 0"}}>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                    <CommentCard onClick={this.onClickHandle}/>
                </div>
                <div className={style.publish}>
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
const mapStateToProps = () => {
    return ({
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);