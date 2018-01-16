import React ,{Component} from 'react';
import {Card,Grid,Button,Icon} from 'antd-mobile';

import './index.css';

const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

//footer
const Footer = (props) => {
    const {good,collect,comment} = props;
    return (
        <div className="card-footer">
            <div className="card-footer-btn" onClick={collect}>
                <div className="card-footer-icon">
                    <img src={require("./img/collection.png")} atl="collection" />
                </div>
            </div>
            <div className="card-footer-btn" onClick={good}>
                <div className="card-footer-icon">
                    <img src={require("./img/good.png")} atl="good" />
                </div>
                <span>55</span>
            </div>
            <div className="card-footer-btn" onClick={comment}>
                <div className="card-footer-icon">
                    <img src={require("./img/comment.png")} atl="comment" />
                </div>
                <span>55</span>
                
            </div>
            <div className="card-footer-btn">
                <div className="card-footer-icon">
                    <img src={require("./img/menber.png")} atl="menber" />
                </div>
                <span>55</span>
            </div>
            
            
            
            
        </div>
    )
};
//header
const Header = () => {};
//thumb
const Thumb = () => {
    return (
        <div className="header-photo">
            <img src={require('./img/header.png')} alt="header"/>
        </div>
    )
}
//header-extra
const Extra = (handleClick) => {
    const click = handleClick.onClick;
    return (
        <div className="btn-add" onClick={click}>
            <a>
                <div className="btn-add-img">
                    <img src={require("./img/add.png")} />
                </div>
                <span>关注</span>
            </a>
        </div>
    )
}
const DataCard = () => {
    return (
        <div>
            <Card>
                <Card.Header 
                    title = {"userName"}
                    thumb =  {<Thumb />}
                    extra={<Extra onClick={()=>{console.log("extra onClick")}}/> }
                />
                <Card.Body>
                    <div className="card-img"></div>
                    <div className="card-body-content">
                        <h1>这是文章标题</h1>
                        <p>这是文字秒速。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>
                    </div>
                </Card.Body>
                <Card.Footer 
                    content={<Footer good={good} collect={collect} comment={comment}/>}
                    // extra={'this is footer extra'}
                />
            </Card>
        </div>
    )
}
// 点击事件good,collect,comment
const good = (e) =>{
    // let isGood =  false;
    const isGood = e.target.getAttribute("src");
    console.log(isGood);
    // e.target.setAttribute("src",require('./img/good-active.png'));
}
const collect =()=>{

} 
const comment = () => {

}
export default DataCard;