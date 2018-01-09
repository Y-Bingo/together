import { createStore,  applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { } from 'redux-devtools';
import reducer from './reducer';

let middleware = [thunk];

let finalCreateStore;

// 生产环境中，我们希望只使用 middleware。
// 而在开发环境中，我们还希望使用一些 redux-devtools 提供的一些 store 增强器。
// UglifyJS 会在构建过程中把一些不会执行的死代码去除掉。

if (process.env.NODE_ENV === 'production') {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {
    const { persistState ,instrument} = require('redux-devtools');
    // let devTool = window.devToolsExtension ? window.devToolsExtension() : f => f;
    finalCreateStore = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        
    )(createStore);
}

let store = finalCreateStore(reducer);
export default store;