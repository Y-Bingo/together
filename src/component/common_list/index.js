import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavBar,Icon,WhiteSpace,List} from 'antd-mobile';
import UserCard from '../user_card';

import {userInfoSearch} from '../../action/user.info.actions';

class CommonList extends Component{
    constructor(props){
        super(props);
        console.log(props);
        // const params = this.props.match.params;
        this.state = {
            uid : "",
            title : "",
            type : ""
        }
    }
    getTitle(title){
        switch (title) {
            case "care":
                return "我的关注的活动";
            case "publish":
                return "我发布过的活动";
            case "collect":
                return "我的收藏";
            case "msg":
                return "我的消息";   
            case "help":
                return "帮助";     
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
        const navbarTitle = this.props.history
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
                            <UserCard key={index} {...item}/>
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



