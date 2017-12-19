## Babel
### babel-preset-env
最新のECMAScriptに対応していないブラウザでも使用出来るようにES5等にダウングレードしてくれる

### babel-preset-react
ReactをBabelを介して使用するためのモジュール

### babel-plugin-flow-react-proptypes
Babelを介してFlowでの走査対象のファイルから自動的にReactコンポーネントのProptypesを生成してくれるプラグイン

## eslint

`.eslintrc.json`を使ってeslintの細かい設定を行なう

* `extends`: extends already existant eslint rules
* `rules`: override rules

envに`jest`を追加することで、jestをimportしなくても定義されている関数呼び出しのエラーがなくなる
envに`browser`を追加することで、ブラウザでビルトインに定義されている`window`や`document`オブジェクト呼び出しのエラーがなくなる

### package

* `eslint-plugin-compat` -> you can know if javascript APIs can use in brower.
  * `error  navigator.serviceWorker() is not supported in Safari 10.1, Opera Mini all, iOS Safari 10.0-10.2, IE 11, Edge 14  compat/compat`
* `plugin:flowtype/recommended` contains the instruction for ESLint to use Babel's parser. If you want to be more explicit, feel free to add "parser": "babel-eslint" in .eslintrc.json.

### eslint-airbnb
下記コマンドを使うことで`eslint-config-airbnb`を使うための関連モジュールを一括でインストールしてくれる

* `eslint-config-airbnb`
* `eslint-plugin-import`
* `eslint-plugin-jsx-a11y`
* `eslint-plugin-react`

### eslint-plugin-compat
様々なブラウザでJavaScriptのAPIが使えるかどうかをCan I Useを使って判断し、使えないものがある場合はエラー表示してくれる

`package.json`に下記を入れることでブラウザシェアが1%以上のブラウザを対象にすることができる
```json
  "browserslist": ["> 1%"]
```

また、インストールしたcompatを`.eslintrc.json`にも追記しておく

```bash
npm info eslint-config-airbnb@latest peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev eslint-config-airbnb@latest
```


### rules

* `// eslint-disable-next-line` -> this rule is to ignore its after part eslint-rules
* `no-unexpected-multiline` -> semicolon bugs support

## flow

* `flow-bin`: is the binary to run Flow in our `scripts` tasks(npm-scriptsで実行するためのモジュール)
* `babel-preset-flow`: babelにflow-typeを認識させるモジュール
* `eslint-plugin-flowtype`: ESlintでflowtypeをlintするモジュール

`.flowconfig`に下記を追加するとeslint-disableと同じような効果をもたらすことが出来る
```
[options]
suppress_comment= \\(.\\|\n\\)*\\flow-disable-next-line
```

## Jest
テストランナーで、`babel-jest`パッケージをインストールしてから`.eslintrc.json`に下記を追記することで
テストファイル内でのjestで定義されている関数呼び出しで特にインポートせず(no-undefエラー)が発生することを防ぐことが出来る

```
"env": {
  "jest": true
}
```

####  husky
Gitでのcommit/push等をフックして、特定のnpm-scriptsを実行させることが出来るモジュール
`git push --no-verify`を実行することでhuskyに登録しているタスクを実行せずに直接pushすることが可能

#### Express
`comparess`モジュールはExpressのミドルウェアでGzip圧縮させることができるようになる

#### Nodemon
NodemonはNode.jsのバイナリを実行する環境で、--execオプションを設定することで特定のバイナリに変更することができる。
また、--ignoreオプションは該当するパスに変更があった場合でもマニュアルで更新した際に反映させないと言う設定になる（これはHotReloadはしてくれない）

```nodemon --ignore lib --exec babel-node src/server```

#### rimraf
クロスプラットフォーム対応のフォルダをクリーンにするモジュールで今回はbabelでトランスパイルした結果を配置するフォルダに使用する

#### cross-env
`NODE_ENV=production`という環境変数定義はWindowsでは使えないが、cross-envというモジュールで差異を吸収してくれる

## Webpack
* webpackはモジュールバンドラで様々な複数のファイルをそれぞれのまとまりに纏めてくれる
* `webpack.config.babel.js`の説明は該当ファイルに記載しているのでそちらを参照すること
* `webpack-dev-server`は開発時に使用するwebpack用のサーバで、サーバを立てている間はHOTリローディングしてくれる
* webpackコマンドの`--progress`オプションは進行具合などが見やすくなっているため有用,`-p`オプションはバンドルファイルをminifyしてくれる

## memo
* [eslint-env](http://qiita.com/makotot/items/822f592ff8470408be18)
