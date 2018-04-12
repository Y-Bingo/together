import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd-mobile';
// 主题actions
import {good,collect,join} from '../../action/topic.action';
// 评论actions
// 引入样式
import './index.css';
//footer
import Footer from './card_footer';
//thumb
import Thumb from './card_header_thumb';
//header-extra
import Extra from './card_header_extra';

class DataCard extends Component{
    state = {
        ...this.props
    }
    // 进入详情页
    _dec = () => {
        this.props.history.push(`/topic/des/${this.state.tid}`);
    }
    // 点赞
    _good = (e) => {
        console.log("good");
        this.props.good(!this.state.is_good);
        this.setState({
            is_good : !this.state.is_good,
            topic_love: this.state.topic_love + (this.state.is_good ? -1 : 1)
        });
    }
    // 收藏
    _collect = (e) => {
        console.log("collect");
        this.props.collect(!this.state.is_collect);
        this.setState({
            is_collect: !this.state.is_collect,
            topic_collected: this.state.topic_collected + ( this.state.is_collectd ? 1 : -1)
        })
    } 
    // 评论
    _comment = () => {
        this.props.history.push(`/comment/${this.state.tid}`);
    }
   render = ()=>{
        return (
            <div>
                <Card >
                    <Card.Header
                        title={this.state.topic_title}
                        thumb={<Thumb />}
                        extra={<Extra handleClick={() => { console.log("关注了") }} />}
                    />
                    <Card.Body onClick={this._dec}>
                        <div className="card-img"></div>
                        <div className="card-body-content">
                            <h1>{this.state.topic_title}</h1>
                            <p>{this.state.topic_dec}</p>
                        </div>
                    </Card.Body>
                    <Card.Footer
                        content={<Footer _good={this._good} _collect={this._collect} _comment={this._comment} {...this.state} />}
                    />
                </Card>
            </div>
        )
   }
}
// const mapStateToProps = (state) => {
//     return {
//         ...state.topic
//     }
// }
const mapDispatchToProps = { good, collect, join } ;


export default connect(null, mapDispatchToProps)(DataCard)