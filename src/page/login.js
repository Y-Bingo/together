import React , {Component} from 'react';
import {connect} from 'react-redux';

import {login}  from "../action/user.action";

const ActionCreator = {login}; 


class Login extends Component{
    componentDidMount(){
        this.props.login();
   }
    render(){
        return (
            <div>
                Login
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ...state.user
    }
}

export default connect(mapStateToProps, ActionCreator)(Login)