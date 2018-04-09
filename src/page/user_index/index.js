import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    WhiteSpace,
    Button,
    Icon,
    List,
    Card, 
    Popover // 气泡
} from 'antd-mobile';
const myImg = src => <img src={require(`./img/${src}.png`)} className="am-icon am-icon-lg" alt={""} />;
const Title = (props) => {
    // 没有用户名的和签名则，当用户没有登录
    const name = props.user_name ? props.user_name : "你还没登录呢！" ;
    const signatrue = props.user_signatrue ? props.user_signatrue : "请登录";
    return(
        <div style={{marginLeft:6}}>
            <h2 style={{padding:"5px 0"}}>{name}</h2>
            <span style={{color:"#999"}}>{signatrue}</span>
        </div>
    )
    
}
const Item = Popover.Item;

const RightContent = () => (
    <Popover mask
        overlayClassName="fortest"
        overlayStyle={{ color: 'currentColor' }}
        visible={false}
        overlay={[
        (<Item key="4" value="scan" icon={myImg('scan')} data-seed="logId">Scan</Item>),
        (<Item key="5" value="special" icon={myImg('qrscan')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
        (<Item key="6" value="button ct" icon={myImg('help')}>
            <span style={{ marginRight: 5 }}>Help</span>
        </Item>),
        ]}
        align={{
        overflow: { adjustY: 0, adjustX: 0 },
        offset: [-10, 0],
        }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.onSelect}
    >
        <div style={{
        height: '100%',
        padding: '0 15px',
        marginRight: '-15px',
        display: 'flex',
        alignItems: 'center',
        }}
        >
        <Icon type="ellipsis" />
        </div>
    </Popover>
)
 
class UserIndex extends Component {
    constructor(){
        super();
        this.state = {
            user : {}
        }
    }
    componentWillReceiveProps(newProps){
        console.log(newProps);
    }
    componentDidMount(){
        this.setState({
            user : this.props.user
        })
    }
    clickToEdit = () =>{
        // 如果用户没有登录，则跳转到登录页面
        if(this.state.user.uid){
            this.props.history.push("/user/edit");
        }else{
            this.props.history.push('./log');
        }
        // 如果用户登录的，则跳转到编辑页面
    }
    handleClick = (type) => {
        this.props.history.push(`/user/${type}/${this.state.user.uid}`);
    }
    
    render() {
        let user = this.state.user;
        // const /
        let user_head = user.user_head ? user.user_head : "head-default";
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={<RightContent />}
                >我的</NavBar>
                <WhiteSpace size="lg" />
                <List>
                    <Card onClick={this.clickToEdit}>
                        <Card.Header
                            title={<Title {...user}/>}
                            thumb={<img src={require(`./img/${user_head}.png`)} style={{width:"5.5rem",height:"5.5rem",verticalAlign:"top"}}  alt="user_head_photo"/>}
                        />
                        {/* </Card.Header> */}
                    </Card>
                </List>
                
                <WhiteSpace />
                <List>
                    <List.Item
                        thumb={myImg('care')}
                        onClick={()=>{this.handleClick("care")}}
                    >
                        我关注的人
                    </List.Item>
                    <List.Item
                        thumb={myImg('collect')}
                        onClick={() => { this.handleClick("collect") }}
                    >
                        我的收藏的活动
                    </List.Item>
                    <List.Item
                        thumb={myImg('msg')}
                        onClick={() => { this.handleClick("msg") }}
                    >
                        我的消息
                    </List.Item>
                    <List.Item
                        thumb={myImg('help')}
                        onClick={() => { this.handleClick("help") }}
                    >
                        帮助与反馈
                    </List.Item>
                </List>
                <WhiteSpace size="sm" />
                <List>
                    <List.Item
                        thumb={myImg('publish')}
                        onClick={() => { this.handleClick("publish") }}
                    >
                        我发布过的活动
                    </List.Item>
                    <List.Item
                        thumb={myImg('join')}
                        onClick={()=>{this.handleClick("join")}}
                    >
                        我参加的活动
                    </List.Item>
                </List>
            </div>
        )
    }
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => (
    {
        user: state.user
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);