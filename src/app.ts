import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import express, {Request, Response} from 'express'
import expressWs from 'express-ws'

import GameLibrary from './game/GameLibrary'
import PlayerLibrary from './database/PlayerDatabase'

const app = express()
expressWs(app)

/* Routers must be imported after express-ws is initialized, therefore 'require' syntax */
const indexRouter = require('./pages')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const gamesRouter = require('./routes/games')
const gamesWebsocketRouter = require('./routes/gamesWebsocket')

/* Templating engine */
app.set('views', path.join(__dirname, 'pages/views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

/* CORS */
app.use(function (req: Request, res: Response, next) {
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Origin', req.get('origin'))
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie')

	next()
})

/* HTTP routers */
app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/games', gamesRouter)

/* WS routers */
app.use('/play', gamesWebsocketRouter)

/* Global error handler */
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
})

/* Global state */
global.gameLibrary = new GameLibrary()
global.playerLibrary = new PlayerLibrary()

app.listen((process.env.PORT || 3000))
