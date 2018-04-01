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
import { loadMore } from "../../action/topic.action";


// const NUM_ROWS = 5;//每页渲染的个数
// let pageIndex = 0;// 页数

const data = [{a : 1}]
class List extends Component {
    constructor(props) { 
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            NUM_ROWS : 5, //当前每次渲染条目しゅ
            pageIndex : 0, // 当前页数
            dataSource,
            isLoading: this.props.is_loading, // 是否在更新中
            height: document.documentElement.clientHeight, //设置高度
            useBodyScroll: false, // 不适用body
            refreshing: false, // 显示刷新状态
            topic_data : [] // 数据
        };
    }
    genData(pIndex= 0){
        const NUM_ROWS = this.state.NUM_ROWS;
        const pageIndex = this.state.pageIndex;
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        return dataArr;
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.dataSource !== this.state.topic_data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.topic_data),
            });
        }
    }
    // shouldComponentUpdate(nextProps,nextState){
    // }
    componentDidUpdate() {
        // if (this.state.useBodyScroll) {
        //     document.body.style.overflow = 'auto';
        // } else {
        //     document.body.style.overflow = 'hidden';
        // }
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.genData()),
                height: hei,
                isLoading: false,
            });
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
        // console.log('reach end', event);
        this.setState({isLoading:true});
        this.props.loadMore();
        setTimeout(() => {
            this.setState({pageIndex: ++this.state.pageIndex})
            this.rData = [...this.rData, ...this.genData(this.state.pageIndex)];
            console.log("this.rData",this.rData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading : false
            });
        }, 1000);
    };
    render = () => {
        // 空隙
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
        let index = this.state.topic_data.length; // 选染行的个数；
        //当前已经渲染で条目数
        const nowRow = (this.state.pageIndex + 1) * this.state.NUM_ROWS
        console.log("genData", this.genData());
        console.log("nowRow", nowRow);
        const row = (rowData, sectionID, rowID) => {
       

            if (index < nowRow) {
                index = this.state.topic_data.length - 1;
            }
            const card_data = this.state.topic_data[index--];
            return (
                <div key={rowID} style={{width:"100%"}}>
                    <DataCard card_data = {card_data} history={this.props.history}/>
                </div>
            );
        };
        return (
            <div style={{marginTop:"45px"}}>
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={el => this.lv = el}
                        // 渲染的资源
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
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={25}
                        // 每次事件循环渲染的行数
                        pageSize={5}                   
                    />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    topic_data : state.topic_data
})
const mapDispatchToProps = {loading, loadMore};
// const mapStateToProps = (state) =>{
//     return {
//         ...state.app,
//         ...state.topic
//     }
// }
export default connect(null, mapDispatchToProps)(List)
