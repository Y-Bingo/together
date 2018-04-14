import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import{
    NavBar,
    Icon,
} from "antd-mobile"
import ListView from '../component/listView';

import {loadTopic} from "../action/topic.action";

// 这是一个长列表
class Square extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.loadTopic();
    }
    render = ()=>{
        console.log(this.props.topic);
        return(
            <div>
                <NavBar
                    className="my-tab-bar"
                    mode="light"
                    icon={<Icon key="0" type="search" />}
                    onLeftClick={() => {this.props.history.push('/search')}}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >搜索你想看的</NavBar>
               <ListView  topic_data={this.props.topic.topic_data} history={this.props.history}/>
            </div>
        )
    }
}

const mapDispatchToProps = {loadTopic};
// props : app , topic
const mapStateToProps = (state) => {
    return (
        {
            app : state.app,
            topic: state.topic
        }
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
