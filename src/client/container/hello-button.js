// @flow

import { connect } from 'react-redux'

import { sayHello } from '../action/hello'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Say hello',
})

// dispatchを使ってReactコンポーネントのButtonとReduxActionのsayHelloを接続している
// => と書いてあるけど、connectが連携しているように見える、
// Buttonに対してhandleClickが発火した際にsayHello()がdispatch()される様になっているから、
// Reduxのstoreが変わるようになるから連携はここでされているとも言えなくもない？
const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(sayHello('Hello!')) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)

