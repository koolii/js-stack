// @flow

import 'babel-polyfill'

import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

const composeEnhancers = (
  // eslint-disable-next-line no-underscore-dangle
  isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) || compose
// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__

// 作成したそれぞれのstateを１つの巨大なstoreに一括管理している
const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

// eslint-disable-next-line no-console
console.log(store.getState())


const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

//  null. This type is incompatible with the expected param type ofと言うエラーが出てしまう
// flow-disable-next-line
ReactDOM.render(wrapApp(App, store), rootEl)

// webpack.config.babel.jsのdevServerオブジェクトのhotキー対応？
if (module.hot) {
  // hot-reloadingの際に下記でなぜrequireしなければならないのかがわからない
  // app以外のReactコンポーネントの変更も感知したいという理由？
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    // flow-disable-next-line
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
