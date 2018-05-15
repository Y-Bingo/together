import React, { Component } from 'react';
import { Provider,connect } from "react-redux";
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import cookie from 'js-cookie'; 
import store from './store';
// import "./http.config";// 引入http请求监听器
// 应用
import LeadingPage from './page/lead_page/lead'; /* 引导页面 */
import LogOrReg from './page/L&R'; /* 登录注册页面 */
import Forget from './page/forget'; /* 寻找忘记密码页面 */
// 用户
import UserIndex from './page/user_index'; /* 用户中心页面 */
import Search from './page/search_page/search'; /* 搜索页面 */
import UserInfoEdit from './page/user_info_edit'; /* 用户信息编辑页面 */
import CommonList from './component/common_list'; /* 列表 */
// 主题
import TopIndex from './page/topic.index'; /* 主题广场页面 */
import Public from './page/topic.publish'; /* 主题页面发送 */
import TopicDes from './page/topic.des/topic.des' ; /* 主题详情页 */
// 评论
import CommentPage from './page/com';
//test
import Card from './component/card';

import {checkHasCookies} from './action/user.action';//
class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/" exact component={ LeadingPage } /> {/*主页*/}
                <Route path="/forget" component={ Forget } /> {/*忘记密码页*/}
                <Route path="/search" component={ Search } /> {/*搜索*/}
                <Route path="/index" component={ TopIndex } /> {/*主页（广场）*/}
                <Route path="/log" component={ LogOrReg } /> {/*登录注册*/}
                {/* <Route path="/topic/public" comment={} /> 主题的发布 */}
                <Route path="/topic/des/:tid" component={ TopicDes } /> {/* 主题详情页 需要tid*/}
                <Route path="/comment/:tid" component={ CommentPage } /> {/* 评论页 需要tid*/ }
                <Route path="/user" component={ UserIndex }  exact/> {/*用户主页*/}
                <Route path="/user/edit" component={ UserInfoEdit } /> {/*用户信息编辑*/}
                <Route path="/user/collect" component={ CommonList } /> {/*用户收藏页*/}
                <Route path="/user/care" component={ CommonList } /> {/*用户关注页*/}
                <Route path="/user/publish" component={ CommonList } /> {/*用户推送*/}
                <Route path="/user/help" component={ CommonList } /> {/*帮助*/}
                <Route path="/user/msg" component= { CommonList} /> {/*我的消息*/}
                <Route path="/user/join" component={CommonList} />{/*我要参加的活动*/}
                <Route path="/test" component={ Card } /> {/*测试*/}
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

const mapDispatchToProps = {
    checkHasCookies
}
export default App;
// export default connect(null, mapDispatchToProps)(App)
