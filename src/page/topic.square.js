import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import{
    NavBar,
    Icon,
} from "antd-mobile"
import ListView from '../component/listView';


class Square extends Component{
    constructor(props) {
        super(props);
    }
  
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
               <ListView />
            </div>
        )
    }
}

const mapDispatchToProps ={};

export default connect(null, mapDispatchToProps)(Square)
