import {combineReducers} from 'redux';

import user from './user.reducer';
import search from './search.reducer';


export default combineReducers({
    user,
    search
}); 