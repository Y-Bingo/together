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
        ...this.props.card_data
    }
    // 点赞
    good = (e) => {
        console.log("good");
        this.props.good(this.state.is_good);
        this.setState({
            is_good : !this.state.is_good
        })
    }
    // 收藏
    collect = () => {
        console.log("collect");
        this.props.collect(this.state.is_collect);
        this.setState({
            is_collect: !this.state.is_collect
        })
    } 
    // 评论
    comment = () => {
        this.props.history.push(`/comment/${this.state.tid}`);
    }
   render = ()=>{
        return (
            <div>
                <Card>
                    <Card.Header
                        title={"userName"}
                        thumb={<Thumb />}
                        extra={<Extra handleClick={() => { console.log("extra onClick") }} />}
                    />
                    <Card.Body>
                        <div className="card-img"></div>
                        <div className="card-body-content">
                            <h1>这是文章标题</h1>
                            <p>这是文字秒速。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>
                        </div>
                    </Card.Body>
                    <Card.Footer
                        content={<Footer good={this.good} collect={this.collect} comment={this.comment} {...this.state} />}
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