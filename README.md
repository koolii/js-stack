## eslint

### package

* `eslint-plugin-compat` -> you can know if javascript APIs can use in brower.
  * `error  navigator.serviceWorker() is not supported in Safari 10.1, Opera Mini all, iOS Safari 10.0-10.2, IE 11, Edge 14  compat/compat`
* `plugin:flowtype/recommended` contains the instruction for ESLint to use Babel's parser. If you want to be more explicit, feel free to add "parser": "babel-eslint" in .eslintrc.json.

### rules

* `// eslint-disable-next-line` -> this rule is to ignore its after part eslint-rules
* `no-unexpected-multiline` -> semicolon bugs support

### flow

* `flow-bin` is the binary to run Flow in our `scripts` tasks

## memo
* [eslint-env](http://qiita.com/makotot/items/822f592ff8470408be18)
