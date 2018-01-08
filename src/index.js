import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 引入semantic-ui样式
// import 'semantic-ui-css/semantic.min.css';



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
