### babel-preset-env
最新のECMAScriptに対応していないブラウザでも使用出来るようにES5等にダウングレードしてくれる

## eslint

`.eslintrc.json`を使ってeslintの細かい設定を行なう

* `extends`: extends already existant eslint rules
* `rules`: override rules

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

### flow

* `flow-bin`: is the binary to run Flow in our `scripts` tasks(npm-scriptsで実行するためのモジュール)
* `babel-preset-flow`: babelにflow-typeを認識させるモジュール
* `eslint-plugin-flowtype`: ESlintでflowtypeをlintするモジュール

`.flowconfig`に下記を追加するとeslint-disableと同じような効果をもたらすことが出来る
```
[options]
suppress_comment= \\(.\\|\n\\)*\\flow-disable-next-line
```

### Jest
テストランナーで、`babel-jest`パッケージをインストールしてから`.eslintrc.json`に下記を追記することで
テストファイル内でのjestで定義されている関数呼び出しで特にインポートせず(no-undefエラー)が発生することを防ぐことが出来る

```
"env": {
  "jest": true
}
```

###  husky
Gitでのcommit/push等をフックして、特定のnpm-scriptsを実行させることが出来るモジュール
`git push --no-verify`を実行することでhuskyに登録しているタスクを実行せずに直接pushすることが可能

## memo
* [eslint-env](http://qiita.com/makotot/items/822f592ff8470408be18)
