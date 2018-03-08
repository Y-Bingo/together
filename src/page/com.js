import React, {Component} from 'react';
import {
    NavBar,
    Icon,
    List
} from 'antd-mobile'

class CommentPage extends Component{
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
                    >评论页</NavBar>
            </div>
        )
    }
}

export default CommentPage;