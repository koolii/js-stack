// @flow

import { connect } from 'react-redux'

import Message from '../component/message'

const mapStateToProps = state => ({
  // ここのstate.helloと言うのはsrc/index.jsxのcombineReducers()で対応付けがされている
  message: state.hello.get('message'),
})

export default connect(mapStateToProps)(Message)
