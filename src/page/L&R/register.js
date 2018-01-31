import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    // WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,
    Toast
} from 'antd-mobile';

import { register, clean_msg } from '../../action/user.action';

const actionCreator = { 
    register,
    clean_msg
};

class Register extends Component {
     state = {
        hasError: false,
        user_name: "",
        user_pwd: "",
        user_repwd: ""
    }
    showMsg(text) {
        if (text) {
            Toast.info(text, 1.5, () => {
                this.props.clean_msg();
            })
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确的邮箱地址！');
        }
    }
    onChange = (key, value) => {
        if(key==='user_name'){
//  邮箱验证正则 
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            if ( !reg.test(value) ) {    
                 this.setState({ hasError: true,}); 
            } else {  
                this.setState({  hasError: false, }); 
            }
        }
        this.setState({
            [key] : value
        })
    }
    render() {
        return (
        //    <WingBlank>
                <div>
                    {this.props.msg ? this.showMsg(this.props.msg) : null}
                    <WhiteSpace />                    
                    <List>
                        <InputItem
                            className="input-border"
                            type="text"
                            placeholder="input your Email"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={(v) => this.onChange("user_name" ,v)}
                            value={this.state.user_name}>邮箱</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            className="input-border"
                            type="text"
                            placeholder="输入你的密码"
                            onChange={(v) => this.onChange("user_pwd" ,v)}
                            value={this.state.user_pwd}>密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            className="input-border"
                            type="text"
                            placeholder="确认密码"
                            onChange={(v) => this.onChange("user_repwd" ,v)}
                            value={this.state.user_repwd}>确认密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>                    
                    <List>
                        <Button 
                            type="primary"
                            onClick={() => { this.props.register(this.state)}}
                        >注册</Button>
                    </List>
                    {/* <WhiteSpace size="lg"/> */}
                    <WhiteSpace />  
                </div>
            // </WingBlank>
        )
    }
}

function mapStateToProps(state){
    return {
        ...state.user 
    }
}


export default connect(mapStateToProps,actionCreator)(Register)