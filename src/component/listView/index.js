import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    PullToRefresh,
    ListView,
    Button,
    WhiteSpace
} from "antd-mobile"
import DataCard from '../card';
import './listView.css';
import { loading,  } from '../../action/app.action';
import { loadTopic } from "../../action/topic.action";

let pageIndex = 0 ;
const  NUM_ROWS = 2; //当前每次渲染条目 
class List extends Component {
    constructor(props) { 
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        // 没渲染的个数应该是后台第一次请求回来后的数据的一半
        this.state = {
            
           
            dataSource,
            isLoading: this.props.is_loading, // 是否在更新中
            height: document.documentElement.clientHeight, //设置高度
            hasMore:true ,
            useBodyScroll: false, // 不适用body
            refreshing: false, // 显示刷新状态
            topic_data : [] ,// 数据,
        };
    }
    genData(pIndex= 0){
        // const NUM_ROWS = this.state.NUM_ROWS; // 每次渲染的条目数
        const pageIndex = this.state.pageIndex; // 当前页数
        const dataArr = []; // 数据id数组
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        return dataArr;
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.topic_data !== this.state.topic_data) {
            console.log("是否要传入的数据不一样了？",nextProps.topic_data !== this.state.topic_data);
            this.setState({
                // 这里是要读取插进来的topic_data,来判断是否要更新
                dataSource: this.state.dataSource.cloneWithRows(nextProps.topic_data),
                index: this.props.topic_data.length ,
                topic_data: [ ...nextProps.topic_data]

            });
        }
    }
    componentDidMount() {
        const height = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        
        setTimeout(() => {
            this.rData = this.genData();
            let NUM_ROWS = this.props.topic_data.length;
            this.setState({ 
                NUM_ROWS: NUM_ROWS,

                dataSource: this.state.dataSource.cloneWithRows(this.genData()),
                height: height,
                isLoading: false,
                // topic_data:this.props.topic_data ,
                // index: this.props.topic_data.length 
            });
            console.log("componentDinMount",this.state);
        }, 1500);
    }

    // 刷新回调函数
    onRefresh = () => {
        this.setState({ refreshing: true ,isLoading : true });
        // 正在加载
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading : false
            });
        }, 600);
    }
    // 拉倒底部时
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if ( this.state.isLoading && !this.state.hasMore) {
            // 判断是否在加载，如果在加载的话 并且没有更多的数据则返回空
            console.log('正在更新中');
   
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading:true});
        // 获取更多的数据
        this.props.loadTopic();
        setTimeout(() => {
            
            this.rData = [...this.rData, ...this.genData(++pageIndex)];
            console.log("this.rData",this.rData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading : false
            }); 
        }, 1000);
    };
    render = () => {
        let topic_data = this.state.topic_data || [];
        // 列表项之间的空隙
        const separator = (sectionID, rowID) => (
            < WhiteSpace key = {
                `${sectionID}-${rowID}`
            }
            size = "sm"
            style = {
                {
                    backgroundColor: '#F5F5F9',
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }
            }
            />
        );

        // let index = topic_data.length; // 一共有多少个数据？；
        let index = this.state.topic_data.length - 1 ;
        //当前已经渲染条目数
        // const nowRow = (this.state.pageIndex + 1) * this.state.NUM_ROWS
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.topic_data.length - 1;
            }
            
            const card_data = this.state.topic_data[index--];
            console.log("row", index, card_data); 
            return (
                <div key={rowID} style={{width:"100%"}}>
                    <DataCard {...card_data} history={this.props.history}/>
                </div>
            );
        };
        return this.state.topic_data.length ? (
            <div style={{marginTop:"45px"}}>
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={el => this.lv = el}
                        initialListSize={2} // 自定组件初始化的时候渲染多少个组件
                        // 渲染的资源 唯一标识数组
                        dataSource={this.state.dataSource}
                        // 渲染的头部
                        renderHeader={() => <p></p>}
                        // 渲染的脚步
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        // 渲染的每个子项
                        renderRow={row}
                        // 渲染的间隔
                        renderSeparator={separator}
                        useBodyScroll={this.state.useBodyScroll}
                        style={this.state.useBodyScroll ? {} : {
                            height: this.state.height,
                            border: '1px solid #ddd',
                            margin: '5px 0',
                        }}
                        pullToRefresh={<PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        scrollEventThrottle={30}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={20}
                        // 每次事件循环渲染的行数
                        pageSize={5}                   
                    />
            </div>
           
        ) : (<div ref={el => this.lv = el}> loading </div>)
        
    }
}
const mapStateToProps = (state) => ({
    // topic : state.topic
})
const mapDispatchToProps = {loading, loadTopic};
// const mapStateToProps = (state) =>{
//     return {
//         ...state.app,
//         ...state.topic
//     }
// }
export default connect(null, mapDispatchToProps)(List)
