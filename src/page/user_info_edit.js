import React, {Component} from 'react';
import {connect} from "react-redux";
import cookie from 'js-cookie';
import {
    NavBar,
    Icon,
    WhiteSpace,
    ImagePicker,
    List,
    Button,
    Modal
} from "antd-mobile";
import {user_info_edit} from '../action/user.action';
class UserInfoEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_head_photo: "head-boy",
            user_name : "设置昵称" ,
            user_sex : "设置性别",
            user_city : "设置城市" ,
            user_signatrue : "设置自己签名"
        }
    }
    componentDidMount() {
        console.log("user_info_edit",this.props.user);
        this.setState({...this.props.user});
    }
    
    save = () => {
        this.props.user_info_edit(this.state);
    }
    handleClick = (key)=>{
        switch (key) {
            case "user_head_photo":
                console.log('更换头像');
                break;
            case 'user_sex':
                Modal.operation([
                    { text: 'boy', onPress: () => this.setState({ [key]: "boy" }) },
                    { text: 'girl', onPress: () => this.setState({ [key]: "girl" }) },
                ])
                break;
            default:
            // prompt第一个参数可以是reactElement
                Modal.prompt("请输入"," ", [
                    { text: '取消' },
                    { text: '确定', onPress: value => this.setState({ [key]: value }) },
                ], 'default', this.state[key])
                break;
        }
        
    }
    render(){
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >编辑个人信息</NavBar>
                <WhiteSpace size="sm"/>
                <List>
                    <List.Item
                        extra={<img src={this.state.user_head} style={{ width: "5rem", height: "5rem", verticalAlign: "top"}}/>}
                        onClick={() => this.handleClick("user_head_photo")}>
                    <List.Item.Brief>头像</List.Item.Brief></List.Item>
                </List>
                <WhiteSpace size="md"/>
                <List>
                    <List.Item 
                        extra={this.state.user_name}
                        onClick={()=>this.handleClick("user_name")}>
                        <List.Item.Brief>昵称</List.Item.Brief>
                    </List.Item>
                    <List.Item 
                        extra={this.state.user_sex}
                        onClick={()=>this.handleClick("user_sex")}>
                        <List.Item.Brief>性别</List.Item.Brief>
                    </List.Item>
                    <List.Item 
                        extra={this.state.user_city}
                        onClick={()=>this.handleClick("user_city")}>
                        <List.Item.Brief>所在地</List.Item.Brief>
                    </List.Item>
                    <List.Item 
                        extra={this.state.user_signatrue}
                        onClick={()=>this.handleClick("user_signatrue")}>
                        <List.Item.Brief>签名</List.Item.Brief>
                    </List.Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Button onClick={this.save}>保存</Button>
                </List>
            </div>
        )
    }
}

const mapDispatchToProps = {user_info_edit}
const mapStateToProps = (state) => (
    {
        user: state.user
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit)