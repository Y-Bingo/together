import {combineReducers} from 'redux';

import user from './user.reducer';
import search from './search.reducer';
import topic from './topic.redcuer';

export default combineReducers({
    user,
    search,
    topic
}); 