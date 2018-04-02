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
    }
    moreComment = () => {
        this.props.moreComment();
        console.log("产看更多评论");
    }
    render() {
        return (
            <div>
                <Card>
                    <Card.Header
                        title={"用户名"}
                        thumb={<Thumb/>}
                        extra={"2018-10-1"}
                    />
                    <Card.Body style={style.cardBody}>
                        <div style={style.body}>
                            {"这里是评论内容"}
                        </div>
                        <div style={style.reply}>
                            <p>
                                <span style={style.reply.span}>
                                    {"username"}
                                </span>
                                {}
                                {"这里是回复的评论"}
                            </p>
                            <p>
                                <span style={style.reply.span}>{"ingi :"}</span>
                                {"这里是回复的评论"}
                            </p>
                            <p>
                                <span style={style.reply.span}>{"ingi :"}</span>
                                {"这里是回复的评论"}
                            </p>
                            <a style={style.reply.a} onClick={this.moreComment}>更多评论 》》</a>  
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


