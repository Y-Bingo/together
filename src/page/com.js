  import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    Icon,
    List,
    WhiteSpace
} from 'antd-mobile'

import CommentCard from '../component/comment_card';

class CommentPage extends Component{
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount(){
        // 请求评论数据
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
                    >评论页</NavBar>
                <WhiteSpace />
                <div>
                    <CommentCard />
                </div>
                

            </div>
        )
    }
}

const mapDispatchToProps = () => {
    return ({

    })
}
const mapStateToProps = () => {
    return ({
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);