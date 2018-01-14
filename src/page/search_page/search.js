import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    SearchBar,
    Flex,
    NavBar,
    Icon,
    WhiteSpace,
    WingBlank,
    List
} from 'antd-mobile';
// 引入样式
import './search.css';

import {search} from '../../action/search.action';

const mapDispatchToProps = {search};

class Search extends Component{
    constructor(){
        super();
        this.state = {
            key : ""
        }
    }
    handleClick = (e) => {
        this.setState({ 
            key: e.target.getAttribute('data-search-key') ? e.target.getAttribute('data-search-key') : "all"
        })
        //后面需要直接执行搜索
        //    提交搜索action
        // this.search();
        // 这里有个小bug，点击提交没有立即渲染页面
    }
    onChange = (key)=> {
        this.setState({key})
    }
    onBlur = () => {
       console.log("失去焦点");
    }
    onSubmit = ()=>{
         //    提交搜索action
       this.search();
    }
    search = ()=>{
        this.state.key ? this.props.search(this.state.key) : console.log("不去搜索");
    }
    render(){
        const PlaceHolder = ({ className = '', text = "Block" }) => (
            <div className={`${className} placeholder`} data-search-key={text} >{text}</div>
        );
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >搜索</NavBar>
                <SearchBar 
                    value = {this.state.key}
                    placeholder="搜索你感兴趣" 
                    maxLength={10} 
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                <WhiteSpace size="lg" />
                <div className="content">
                    <WingBlank>
                        <List renderHeader={()=>"试试搜索这些"} >
                            <Flex wrap="wrap" onClick={this.handleClick}>
                                <PlaceHolder text="asdfassssssss"/>
                                <PlaceHolder />
                                <PlaceHolder /><PlaceHolder /><PlaceHolder /><PlaceHolder /><PlaceHolder />
                            </Flex>
                        </List>
                    </WingBlank>
                </div>
               
            </div>
        )    
    }
}



export default connect(null, mapDispatchToProps)(Search)