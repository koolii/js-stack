// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import App from './app'
import helloReducer from './reducer/hello'

import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

// 作成したそれぞれのstateを１つの巨大なstoreに一括管理している
const store = createStore(
  // helloをキーとしてhelloReducerを配置している
  combineReducers({ hello: helloReducer }),
  // eslint-disable-next-line no-underscore-dangle
  isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

// eslint-disable-next-line no-console
console.log(store.getState())


const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>
)

// flow-disable-next-line
//  null. This type is incompatible with the expected param type ofと言うエラーが出てしまう
ReactDOM.render(wrapApp(App, store), rootEl)

// webpack.config.babel.jsのdevServerオブジェクトのhotキー対応？
if (module.hot) {
  // hot-reloadingの際に下記でなぜrequireしなければならないのかがわからない
  // app以外のReactコンポーネントの変更も感知したいという理由？
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    // flow-disable-next-line
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
