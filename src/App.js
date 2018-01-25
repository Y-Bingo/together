import React, { Component } from 'react';
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter} from 'react-router-dom';
 
import store from './store';

import LeadingPage from './page/lead_page/lead';
import LogOrReg from './page/L&R';
import Forget from './page/forget';
import TopIndex from './page/topic.index';
import UserIndex from './page/user_index';
import Search from './page/search_page/search';
import UserInfoEdit from './page/user_info_edit';
import CommonList from './component/common_list';
//test
import Card from './component/card';
class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/" exact component={LeadingPage} /> {/*主页*/}
                <Route path="/forget" component={Forget} /> {/*忘记密码页*/}
                <Route path="/search" component={Search} /> {/*搜索*/}
                <Route path="/index" component={TopIndex} /> {/*主页（广场）*/}
                <Route path="/log" component={LogOrReg} /> {/*登录注册*/}
                <Route path="/user" component={UserIndex}  exact/> {/*用户主页*/}
                <Route path="/test" component={Card} /> {/*测试*/}
                <Route path="/edit" component={UserInfoEdit} /> {/*用户信息编辑*/}
                <Route path="/user/collect/:uid" component={CommonList} /> {/*用户收藏页*/}
                <Route path="/user/care/:uid" component={CommonList} /> {/*用户关注页*/}
                <Route path="/user/publish/:uid" component={CommonList} /> {/*用户推送*/}
                <Route path="/user/help" component={CommonList} /> {/*帮助*/}
                <Route path="/user/msg/:uid" component={CommonList} /> {/*帮助*/}
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
