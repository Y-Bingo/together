import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    NavBar,
    Icon
} from "antd-mobile";
class UserInfoEdit extends Component {
    render(){
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >编辑个人信息</NavBar>
            </div>
        )
    }
}

const mapDispatchToProps = {}
const mapStateToProps = (state) => (
    {
        ...state.user
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit)