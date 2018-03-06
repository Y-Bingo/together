import {combineReducers} from 'redux';

import app from "./app.reducer"; // app的状态存储
import user from './user.reducer'; // 用户
import search from './search.reducer'; // 搜索
import topic from './topic.redcuer'; // 主题
import user_info from './user.info.reducer'; // 用户信息
import des from './topic.des.reducer'; // 主题详细内容







export default combineReducers({
    app,
    user,
    search,
    topic,
    des,
    user_info
}); 