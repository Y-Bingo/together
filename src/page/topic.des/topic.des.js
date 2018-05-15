import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import InputItem, { NavBar, Icon, WhiteSpace, Carousel, WingBlank, List, Card, Button ,Flex} from 'antd-mobile';

// 引用外来的模块
import Thumb from './topic.des.user_head' ;
import Footer from './topic_dec_footer';
import ExtraMenber from './extra_join_menber';

// 主题actions
import { good, collect, join , intoDec } from '../../action/topic.action';
const Item = List.Item;

class TopicDes extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic_photo: [],
            imgHeight: 176,
            slideIndex: 0,
            ...this.props.topicDesData
        }
    }
    componentWillMount = () => {
        let tid = this.props.match.params.tid
        this.setState({
            tid : tid
        })
    }
    componentDidMount(){
        this.props.intoDec(this.state.tid);
        // () => {
        //     console.log("组件加载完成，开始加载数据");
        // }
    }
    // 点击事件good,collect,comment
    good = (e) => {
        console.log("good");
        this.props.good(this.state.is_good);
        this.setState({
            is_good: !this.state.is_good
        })
    }
    collect = () => {
        console.log("collect");
        this.props.collect(this.state.is_collect);
        this.setState({
            is_collect: !this.state.is_collect
        })
    }
    comment = () => {
        this.props.history.push(`/comment/${this.state.tid}`);
    }
    join = () =>{
        console.log("join");
    }
    render() {
        const icon_good = !this.state.is_good ? "good" : "good-active";
        const icon_collect = !this.state.is_collect ? "collection" : "collection-active";
        const icon_join = !this.state.is_join ? "menber" : "menber";
        const icon_comment = "comment";
        return (
            <div style={{paddingBottom:50}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack() }
                >详情</NavBar>
                <WhiteSpace/>
                <div className="topicBody">
                    <div className="topicImg">
                        <Carousel
                            autoplay={false}
                            infinite
                            selectedIndex={1}
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.topic_photo.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>
                    <WhiteSpace />
                    <div className="topicMsg">
                        <List className="my-list" >
                            <Item 
                                extra={''}
                                thumb={<Thumb head={ this.state.user_head }/>}
                            >
                                {this.state.user_name} 发起
                            </Item>                         
                        </List>
                        <WhiteSpace />
                        <WingBlank size="sm">
                            <List>
                            <Item
                                extra={`已经有${this.state.menber_nums}人参加`}
                            >
                                {this.state.topic_title}
                                <Item.Brief>
                                    {this.state.topic_create_time}
                                </Item.Brief>
                            </Item>
                            <Item
                                extra={""}>
                                <Item.Brief>
                                    {this.state.topic_place}
                                </Item.Brief>
                            </Item>
                            <Item
                                multipleLine={true}

                            >
                                <div  className="topic_dec_header">
                                        活动详情 
                                </div>
                                <div className="topic_dec_detail">
                                    {this.state.topic_dec}
                                </div>
                            </Item>
                            <Item>
                                <Footer {...this.state} 
                                        good={this.good} 
                                        collect={this.collect} 
                                        comment={this.comment}>
                                </Footer>
                            </Item>
                        </List>
                        </WingBlank>
                        
                        <List style={{position:"fixed",bottom:0,width:"100%"}} onClick={this.join}>
                            {
                                this.state.is_join ?
                                <Button type="primary">
                                    我已参加，是否要退出？
                                </Button> 
                                :
                                <Button type="warning">
                                    我要参加
                                </Button>
                            }
                           
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  (state) => (
    { 
        topicDesData : state.topic.topic_dec
    }
)

const mapDispatchToProps = { good, collect, join ,intoDec }


export default connect(mapStateToProps, mapDispatchToProps)(TopicDes)