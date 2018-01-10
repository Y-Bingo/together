import React, { Component } from 'react';
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter} from 'react-router-dom';
 
import store from './store';

import LeadingPage from './page/lead_page/lead';
import Login from './page/login';
import Reg from './page/register';
import TopIndex from './page/topic.index';
import UserIndex from './page/user.index';


class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/" exact component={LeadingPage} />
                <Route path="/login" component={Login} />
                <Route path="/reg" component={Reg} />
                <Route path="/topic" component={TopIndex} />
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
