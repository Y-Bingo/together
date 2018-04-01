import React, {Component} from 'react';
import {TabBar ,WhiteSpace} from 'antd-mobile';
import Square from "./topic.square";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import TopicPublish from "./topic.publish";
function Concern() {
    return (
        <div>concern</div>
    )
}
function Me() {
    return (
        <div>me</div>
    )
}
// 这是主页，主要包含切换
class TopIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectable: "广场"
        };
    }
     renderContent(TabItem){
         return <TabItem history={this.props.history}/>;
    }
    render() {
        const tabs = [
            {
                title: "广场",
                icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                selectIcon: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                badge: "",
                component : Square,
                path : "/square"
            }, {
                title: "关注",
                icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                selectIcon: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                badge: "",
                component : Concern,
                path : "/concern"
            }, {
                title: '发布',
                icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                selectIcon: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                badge: "",
                component: TopicPublish,
                path: "/publish"
            }, {
                title: "我的",
                icon: "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                selectIcon: "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                badge: "",
                component : Me,
                path : "/me"
            }
        ]
        return (
            <div>
                 {/* <SearchBar  /> */}
                <WhiteSpace />
                <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
                    {tabs.map((item, v) => (
                        <TabBar.Item
                            title={item.title}
                            key={item.title}
                            icon={< div style = {{ width: '22px', height: '22px', background: `url(${item.icon}) center center / 21px 21px no-repeat` }}/>}
                            selectedIcon={< div style = {{ width: '30px', height: '30px', background: `url(${item.selectIcon}) center center / 21px 21px no-repeat` }}/>}
                            selected={this.state.selectedTab === item.title}
                            badge={item.badge}
                            onPress={() => {
                                this.setState({selectedTab: item.title});
                            }}
                            data-seed="logId">

                            {this.renderContent(item.component)}

                        </TabBar.Item>

                    ))
}
                </TabBar>
            </div>
        )
    }
}

export default TopIndex;