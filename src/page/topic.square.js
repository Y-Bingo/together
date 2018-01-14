import React,{Component} from 'react';
import {connect} from 'react-redux';
import{
    NavBar,
    Icon
} from "antd-mobile"



class Square extends Component{
    render = ()=>{

        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon key="0" type="search" />}
                    onLeftClick={() => {this.props.history.push('/search')}}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >搜索你想看的</NavBar>
            </div>
        )
    }
}

const mapDispatchToProps ={};

export default connect(null, mapDispatchToProps)(Square)
