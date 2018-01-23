import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    WhiteSpace,
    Button,
    Icon,
    List,
    Card
} from 'antd-mobile';
const Title = (props) => {
    const name = props.name ? props.name : "你还没登录呢！" ;
    const signatrue = props.signatrue ? props.signatrue : "请登录";
    return(
        <div style={{marginLeft:6}}>
            <h2 style={{padding:"5px 0"}}>{name}</h2>
            <span style={{color:"#999"}}>{signatrue}</span>
        </div>
    )
    
}


class UserIndex extends Component {
    clickToEdit = () =>{
        this.props.history.push("/edit");
        console.log('clicktoEdit');
    }
    
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >我的</NavBar>
                <WhiteSpace size="lg" />
                <List>
                    <Card onClick={this.clickToEdit}>
                        <Card.Header
                            title={<Title/>}
                            thumb={<img src={require("./img/head-boy.png")} style={{width:"5.5rem",height:"5.5rem",verticalAlign:"top"}}/>}
                        />
                        {/* </Card.Header> */}
                    </Card>
                </List>
                
                <WhiteSpace />
                <List>
                    <List.Item
                        thumb={<img src={require('./img/care.png')}/>}
                    >
                        我关注的活动
                    </List.Item>
                    <List.Item
                        thumb={<img src={require('./img/collect.png')} />}
                    >
                        我的收藏
                    </List.Item>
                    <List.Item
                        thumb={<img src={require("./img/msg.png")}/>}
                    >
                        我的通知
                    </List.Item>
                    <List.Item
                        thumb={<img src={require("./img/help.png")}/>}
                    >
                        帮助与反馈
                    </List.Item>
                </List>
                <WhiteSpace size="sm" />
                <List>
                    <List.Item
                        thumb={<img src={require("./img/publish.png")} />}
                    >
                        我发布过的活动
                    </List.Item>
                </List>
            </div>
        )
    }
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => (
    {
        ...state.user
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);