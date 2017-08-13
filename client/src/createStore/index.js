import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { errorReporter } from '../middleware';

const middlewares = [thunk];
if(process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
//将错误处理中间件载入

middlewares.push(errorReporter);
const configureStore = (preloadState = {}) => {
  const store = createStore(
    reducers,
    preloadState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f

    )
  )

  return store;
}

export default configureStore;
