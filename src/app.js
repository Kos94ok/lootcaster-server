// @flow

import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import express from 'express'
import expressWs from 'express-ws'

import GameLibrary from './game/GameLibrary'
import PlayerLibrary from './database/PlayerDatabase'

import indexRouter from './pages'
import gameRouter from './routes/game'
import registerRouter from './routes/register'
import loginRouter from './routes/login'
import gameBrowserRouter from './routes/gamebrowser'

const app = express()
expressWs(app)

// view engine setup
app.set('views', path.join(__dirname, 'pages/views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

/* HTTP routers */
app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/gamebrowser', gameBrowserRouter)

/* WS routers */
app.use('/game/:gameId', gameRouter)

app.use((err, req, res) => {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

global.gameLibrary = new GameLibrary()
global.playerLibrary = new PlayerLibrary()

app.listen(3000)
