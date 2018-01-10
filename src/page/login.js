import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,

} from 'antd-mobile';

import Logo from '../component/logo/logo';
import {login} from "../action/user.action";

const ActionCreator = {
    login
};

class Login extends Component {
    state = {
        hasError: false,
        user_name: "",
        user_pwd: ""
    }
    componentDidMount() {
        // this.props.login();
    }

    onChange = (key, value) => {

        console.log(key,value)
        this.setState({
            [key] : value
        })
    }
    render() {
        return (
            <WingBlank>
                <Logo/>
                <div>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="input your Email"
                            // error={this.state.hasError}
                            // onErrorClick={this.onErrorClick}
                            onChange={(v) => this.onChange("user_name" ,v)}
                            value={this.state.user_name}>登录邮箱</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="input your pwd"
                            onChange={(v) => this.onChange("user_pwd" ,v)}
                            value={this.state.user_pwd}>密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>                    
                    <List>
                        <Button 
                            type="primary"
                            onClick={this.props.login}
                        >登录</Button>
                    </List>
                    <WhiteSpace size="lg"/>
                    <div className="forget-link">
                        <a href="/forget">忘记密码了</a>
                    </div>

                </div>
            </WingBlank>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps, ActionCreator)(Login)