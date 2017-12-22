// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'

import routing from './routing'
import { STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

// create Express app
const app = express()

// for websocket
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

// appのままだと、SocketサーバがListenしていないことになるので注意
// (実際にエラーが出てWebSocketが利用できなかった)
http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
