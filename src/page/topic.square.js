import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import{
    NavBar,
    Icon,
} from "antd-mobile"
import ListView from '../component/listView';

// 这是一个长列表
class Square extends Component{
    constructor(props) {
        super(props);
    }
    render = ()=>{ 
        console.log(this.props)
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
               <ListView {...this.props}/>
            </div>
        )
    }
}

const mapDispatchToProps ={};
const mapStateToProps = (state) => {
    return (
        {
            ...state.topic,
            ...state.app,
        }
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
