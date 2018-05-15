import {combineReducers} from 'redux';

import app from "./app.reducer"; // app的状态存储
import user from '../action/user.action'; // 用户
import topic from '../action/topic.action'; // 主题
import user_info from '../action/user.info.actions'; // 用户信息
import search from '../action/search.action'; // 搜索
import comment from '../action/comment.action';

import des from './topic.des.reducer'; // 主题详细内容

export default combineReducers({
    app,
    user,
    search,
    topic,
    des,
    user_info,
    comment
}); 