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
import './search.css';

const PlaceHolder = ({ className = '', text ="Block"}) => (
    <div className={`${className} placeholder`} data-search={text} >{text}</div>
);

const mapDispatchToProps = {};

class Search extends Component{
    constructor(){
        super();
        this.state = {
            search : ""
        }
    }
    handleClick = (e) => {
        this.setState({ 
            search: e.target.getAttribute('data-search') ? e.target.getAttribute('data-search') : "all"
        })
    }
    handleBlur = (value) => {
        console.log(value);
        this.setState({
            search: value
        })
    }

    render(){
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >搜索</NavBar>
                <SearchBar 
                    placeholder="搜索你感兴趣" 
                    maxLength={10} 
                    onBlur={(value) => {this.handleBlur(value)}}
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