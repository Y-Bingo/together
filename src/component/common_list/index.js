import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavBar,Icon,WhiteSpace,List} from 'antd-mobile';
import {userInfoSearch} from '../../action/user.info.actions';

import UserCard from '../user_card';
import topicCard from '../card';

class CommonList extends Component{
    constructor(props){
        super(props);
        // const params = this.props.match.params;
        this.state = {
            uid : "",
            title : "",
            type : "",
            renderItem: UserCard
        }
    }
    getTitle(title){
        // 根据不同的页面选择要渲染的的列表项
        switch (title) {
            case "care":
                return "我关注的人";
            case "publish":
                this.setState({renderItem:topicCard})
                return "我发布过的活动";
            case "collect":
                this.setState({renderItem:topicCard})
                return "我的收藏的活动";
            case "msg":
                return "我的消息";   
            case "help":
                return "帮助";
            case "join" :
                this.setState({renderItem:topicCard})
                return "我参加的活动" ;
            default:
                return "404"
        }
    }
    componentWillMount(){
        const url = this.props.match.url;
        const urlArr = url.split("/");
        this.setState({title:this.getTitle(urlArr[2]),uid:urlArr[3]})
        // const title
    }
    componentDidMount(){
        // this.props.userInfoSearch(this.this.state.uid);
    }
    render(){
        console.log(this.state);
        const navbarTitle = this.props.history;
        // 在文章渲染处添加点击事件，使其进入文章详情列表
        let RenderItem = this.state.renderItem ;
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.goBack()}}
                >{this.state.title}</NavBar>
                <WhiteSpace size="sm"/>
                <List>
                {
                    this.props.data.map((item, index) => 
                        (
                            <RenderItem key={index} {...item}/>
                        )
                    )
                }
                </List>
            </div>
        )
    }
} 
CommonList.defaultProps = {
    data : [
        {user_name : "one",is_care:false,user_head:"boy"},
        { user_name: "two", is_care: true, user_head: "girl" },
        { user_name: "three", is_care: true, user_head: "boy" }
    ]
}

const mapDispatchToProps = {userInfoSearch} ;
const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonList)



