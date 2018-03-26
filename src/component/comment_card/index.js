import React, { Component } from 'react';
import {
    Card,
    List
} from 'antd-mobile';
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
    body : {
        fontSize : "1rem",
        textIndent: "2rem",
        minHeight : "15px"
    },
    reply : {
        backgroundColor:"gray",
        span:{
            color:"blue"
        }
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
    render() {
        return (
            <div>
                <Card>
                    <Card.Header
                        title={"用户名"}
                        thumb={<Thumb/>}
                        extra={"2018-10-1"}
                    />
                    <Card.Body style={{minHeight:"15px",padding:"8px",lineHeight:"27px"}}>
                        <div style={style.body}>
                            {"这里是评论内容"}
                        </div>
                        <div style={style.reply}>
                            <span style={style.reply.span}>{"ingi :"}</span>
                            {"这里是回复的评论"}
                        </div>
                    </Card.Body>
                    <Card.Footer />
                </Card>
            </div>
        )
    }
}

export default CommentCard ;


