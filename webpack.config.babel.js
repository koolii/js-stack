// @flow

import path from 'path'
import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
  entry: [ // appのスタートポイント
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js', // バンドル後のファイル名
    path: path.resolve(__dirname, 'dist'), // バンドルしたファイルを配置する先
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [ // 対象ファイルをtestで設定し、useで使用するバイナリ？、excludeは除外するファイルのパス
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: { // 対象となるファイル(module.rules[0].testとどういう違いがあるのか)
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT, // 開発するwebpack-dev-serverポート番号
  },
}
