import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavBar,Icon,WhiteSpace,List} from 'antd-mobile';

import axiox from 'axios';
import UserCard from '../user_card';
import topicCard from '../card';

import {userInfoSearch,getData} from '../../action/user.info.actions';

class CommonList extends Component{
    constructor(props){
        super(props);
        // const params = this.props.match.params;
        this.state = {
            title : "", // 页面title
            type : "", // 列表类型
            dataUrl : "", // 请求的数据地址
            renderItem: UserCard, // 列表渲染的组件
            data: [] // 数据
        }
    }
    getTitle(title){
        // 根据不同的页面选择要渲染的的列表项
        switch (title) {
            case "care":
                 this.setState({renderItem:UserCard, url: `/user_care/list`},)
                return "我关注的人";
            case "publish":
                 this.setState({renderItem:topicCard, url: `/topic/publish`},)
                return "我发布过的活动";
            case "collect":
                this.setState({renderItem:topicCard , url: `/topic/collect`})
                return "我的收藏的活动";
            case "msg":
                return "我的消息";   
            case "help":
                return "帮助";
            case "join" :
                this.setState({renderItem:topicCard, url: `/topic/join`})
                return "我参加的活动" ;
            default:
                return "404"
        }
    }
    componentWillMount(){
        const url = this.props.match.url;
        const urlArr = url.split("/");
        this.setState({
            title:this.getTitle(urlArr[2]),
            type: urlArr[2], 
        })
    }
    componentDidMount(){
        this.props.getData(this.state.url,this.state.type);
    }   
    render(){
        const navbarTitle = this.props.history;
        // 在文章渲染处添加点击事件，使其进入文章详情列表
        let RenderItem = this.state.renderItem ;
        return (
            <div>
                <NavBar
                    className = "my-tab-bar"
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.goBack()}}
                >{this.state.title}</NavBar>
                <WhiteSpace size="sm"/>
                <List style={{marginTop:"45px"}}>
                {
                    this.props.listData.data.map((item, index) => 
                        (       
                            <div key={index}>
                                <WhiteSpace size="sm"/>
                                <RenderItem  {...item} history={this.props.history}/>
                            </div>
                        )
                    )
                }
                </List>
            </div>
        )
    }
} 
const mapDispatchToProps = {getData} ;
const mapStateToProps = (state) => ({
    listData: state.user_info
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonList)



