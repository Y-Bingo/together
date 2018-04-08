import React from 'react';
import {
    Tabs,
    WhiteSpace,
    List,
    Flex,
    Grid
} from 'antd-mobile';


import Login from './login';
import Register from './register';
import Logo from '../../component/logo/logo';
import './L&R.css';

const tabs = [ //
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
    },
    bottom:{
        position: 'fixed',
        bottom: 0,
        width: "100%"
    }
}
const LM = [ // 其他的登录方式
    {title : "",icon : ""},
    {title : "QQ", icon:"qq"},
    {title : "微信", icon:"weixin"},
    {title : "微博", icon:"weibo"},
    {title : "", icon:""}
];
const myImg = src => <img src={require(`./img/${src.icon}.png`)} className="am-icon am-icon-lg" alt={src.title} />;
// console.log(this.props);
const LogOrReg = (props) => (
    <div >
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
        <div style={style.bottom}>
            <List renderHeader={()=>(<div style={{textAlign:"center", fontSize:"1.2rem"}}>————其他登录方式————</div>)}>
                  <Grid data={LM}
                    columnNum={5}
                    hasLine={false}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px 0 0 0' }}>
                            <img src={require(`./img/${dataItem.icon}.png`)} style={{ width: '40px', height: '40px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{dataItem.title}</span>
                            </div>
                        </div>
                    )}
                    />
            </List>
        </div>
    </div>
)

export default LogOrReg ;