import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import  configureStore from './createStore';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './containers/App';

const preloadState = {};
const store = configureStore(preloadState);

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <div>
        {/* 所有的路由由此转发，每个路由对应的页面都是location-aware的。 */}
        <Route component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
