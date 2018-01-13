import React, { Component } from 'react';
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter} from 'react-router-dom';
 
import store from './store';

import LeadingPage from './page/lead_page/lead';
import LogOrReg from './page/L&R';
import Forget from './page/forget';
import TopIndex from './page/topic.index';
import UserIndex from './page/user.index';
import Search from './page/search';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/" exact component={LeadingPage} />
                <Route path="/forget" component={Forget} />
                <Route path="/search" component={Search} />
                <Route path="/index" component={TopIndex} />
                <Route paht="/log" component={LogOrReg} />
                <Route paht="/user" component={UserIndex} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
