import React, { Component } from 'react';
import {
    Card
} from 'antd-mobile';

const Thumb = () => (
    <div className="header-photo">
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
                    />
                    <Card.Body>
                        <div>
                            {"这里是评论内容"}
                        </div>
                    </Card.Body>

                </Card>
            </div>
        )
    }
}

export default CommentCard ;


