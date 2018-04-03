import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    Card,
    List
} from 'antd-mobile';
import {moreComment} from "../../action/comment.action"
const style = {
    thumb: {
        width: 35,
        height: 35,
        margin: "0  10px 0 0",
        borderRadius: "50%",
        img :{
            verticalAlign: "middle", 
            width: "100%"
        }
    },
    cardBody: {
        padding: "8px",
        lineHeight: "27px"
    },
    body : {
        fontSize: "1rem",
        textIndent: "2rem",
    },
    reply : {
        backgroundColor: "#f2f2f247",
        borderTop: "1px solid #b3afaf42",
        padding: "5px 10px",
        margin: "5px 20px",
        fontSize: "1rem",
        p: {
            lineHeight : "22px",
          
        },
        a: {
            color: "#537ad2c7",
            fontWeight: "bolder"
        },
        span:{
            color: "#3a3a46",
            fontWeight: "bolder",
            marginRight: "5px"

        },
        
    }
}
const Thumb = () => (
    <div style={style.thumb}>
        <img src={require('../../localImg/header.png')} alt="header" />
    </div>
)
class CommentCard extends Component {
    constructor(){
        super();
        this.state = {
            data : [],
            showMore: 2 
        }
    }
    // 请求回复的数据
    componentDidMount() {
        let preData = [
            {
                rep_id: 1,// 评论ID
                com_id: 1,// 评论id
                rep_dec: "这是第一个回复啊",//回复的内容
                rep_from: {
                    user_name: "user2", // 评论人的名字
                    uid: 2 // 评论人的id
                },//评论来之谁
                rep_to: {
                    user_name: "user1", // 收到评论人的名字
                    uid: 1 // 收到评论人的id
                },
                rep_time: "2018/4/2",// 回复的时间
            },
            {
                rep_id: 2,// 评论ID
                com_id: 1,// 评论id
                rep_dec: "这是第二个回复啊",//回复的内容
                rep_from: {
                    user_name: "user3", // 评论人的名字
                    uid: 3 // 评论人的id
                },//评论来之谁
                rep_to: {
                    user_name: "user1", // 收到评论人的名字
                    uid: 1 // 收到评论人的id
                },
                rep_time: "2018/4/2",// 回复的时间
            }, {
                rep_id: 3,// 评论ID
                com_id: 1,// 评论id
                rep_dec: "这是第三个回复啊",//回复的内容
                rep_from: {
                    user_name: "user4", // 评论人的名字
                    uid: 4 // 评论人的id
                },//评论来之谁
                rep_to: {
                    user_name: "user1", // 收到评论人的名字
                    uid: 1 // 收到评论人的id
                },
                rep_time: "2018/4/2",// 回复的时间
            }, {
                rep_id: 4,// 评论ID
                com_id: 1,// 评论id
                rep_dec: "这是第四个回复啊",//回复的内容
                rep_from: {
                    user_name: "user2", // 评论人的名字
                    uid: 2 // 评论人的id
                },//评论来之谁
                rep_to: {
                    user_name: "user1", // 收到评论人的名字
                    uid: 1 // 收到评论人的id
                },
                rep_time: "2018/4/2",// 回复的时间
            },
        ]
        this.setState({
            data : preData 
        })
    }
    
    moreComment = () => {
        this.props.moreComment();
        this.setState({
            showMore : this.state.showMore + 1
        })
        console.log(this.state.showMore);
    }
    render() {
        let comment = this.props.comment ;
        return (
            <div>
                <Card>
                    <Card.Header
                        title={comment.com_from.user_name}
                        thumb={<Thumb/>}
                        extra={comment.com_time}
                    />
                    <Card.Body style={style.cardBody}>
                        <div style={style.body}>
                            {comment.com_des}
                        </div>
                        <div style={style.reply}>
                            {
                                this.state.data.map( (item, index) => {
                                    if(index < this.state.showMore ){
                                        return (
                                            <p key = {item.rep_id}>
                                                <span style={style.reply.span} data-uid={item.rep_from.uid}>
                                                    {item.rep_from.user_name} 回复： 
                                                </span >
                                                {item.rep_dec}
                                            </p>
                                        )
                                    }
                                })
                            }
                            {
                                this.state.data.length > this.state.showMore ?
                                   <a style={style.reply.a} onClick={this.moreComment}>更多评论 》》</a>
                                : null 
                            }
                              
                        </div>
                    </Card.Body>
                    <Card.Footer />
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => (
    {
       
    }
)
const mapDispatchToProps = () => (
    {
        moreComment
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard)


