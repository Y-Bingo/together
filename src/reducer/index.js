import {combineReducers} from 'redux';

import app from "./app.reducer";
import user from './user.reducer';
import search from './search.reducer';
import topic from './topic.redcuer';
export default combineReducers({
    app,
    user,
    search,
    topic
}); 