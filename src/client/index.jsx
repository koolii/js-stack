// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './app'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = AppComponent => (
  <AppContainer>
    <AppComponent />
  </AppContainer>
)

ReactDOM.render(wrapApp(App), rootEl)

// webpack.config.babel.jsのdevServerオブジェクトのhotキー対応？
if (module.hot) {
  // hot-reloadingの際に下記でなぜrequireしなければならないのかがわからない
  // app以外のReactコンポーネントの変更も感知したいという理由？
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
