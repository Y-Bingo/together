import React from 'react';
import {
    Tabs,
    WhiteSpace,
    List,
    Flex
} from 'antd-mobile';


import Login from './login';
import Register from './register';
import Logo from '../../component/logo/logo';
import './L&R.css';

const tabs = [
  { title: '登录' },
  { title: '注册' },
];
const style = {
    tab_item:{
        display : 'flex',
        marginTop:"20px",
        padding:"10px 0",
        justifyContent : "center",
        // height : '250px',
        backgroundColor : '#fff'
    },
    img:{
        width:"100%"
    }
}
const LM = [
    {title : "qq", icon:"qq"},
    {title : "weixin", icon:"weixin"},
    {title : "weibo", icon:"weibo"}
];
// console.log(this.props);
const LogOrReg = (props) => (
    <div>
        <Logo />
        
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
            <div style={style.tab_item}>
                <Login history={props.history} />
            </div>
            <div style={style.tab_item}>
                <Register history={props.history}/>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                Content of third tab
            </div> */}
        </Tabs>
        < WhiteSpace size = "md" />
        <div className="LM">
            <List 
                renderHeader={()=>("其他登录方式")}>
                 <Flex >
                     <Flex.Item />
                {
                    LM.map((item,index) => (
                        <Flex.Item key={item.title}>
                            <img  src={require(`./img/${item.icon}.png`)} alt={item.title}/>
                            <span>{item.title}</span>
                        </Flex.Item>
                    ))
                }
                     <Flex.Item />
                    
                </Flex>
            </List>
        </div>
    </div>
)

export default LogOrReg ;