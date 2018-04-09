import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    WhiteSpace,
    List,
    InputItem,
    Button,
    Toast,
} from 'antd-mobile';

import {login, clean_msg} from "../../action/user.action";

const ActionCreator = {
    login,
    clean_msg
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
    showMsg(text){
        if(text){
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
            // <WingBlank>
            <div>
                    {this.props.msg ? this.showMsg(this.props.msg) :null }
                    <WhiteSpace />
                    <List>
                        <InputItem
                            className="input-border"
                            type="text"
                            size="lg"
                            placeholder="input your Email"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            editable={true}
                            clear={true}
                            onChange={(v) => this.onChange("user_name" ,v)}
                            value={this.state.user_name}>账号</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            type="text"
                            className="input-border"
                            placeholder="input your pwd"
                            onChange={(v) => this.onChange("user_pwd" ,v)}
                            value={this.state.user_pwd}>密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>                    
                    <List>
                        <Button 
                            type="primary"
                            onClick={()=>{this.props.login(this.state)}}
                        >登录</Button>
                    </List>
                    <WhiteSpace size="lg"/>
                    <div className="forget-link" 
                         onClick={() => {this.props.history.push('/forget')}}>
                        <span>忘记密码了</span>
                    </div>
                    <WhiteSpace />
                    

                </div>
            // </WingBlank>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps, ActionCreator)(Login)