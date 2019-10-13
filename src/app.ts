require('babel-polyfill')

import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

import express, {Request, Response} from 'express'
import expressWs from 'express-ws'

import Database from './database/Database'
import GameLibrary from './game/GameLibrary'
import PlayerLibrary from './database/PlayerLibrary'

const app = express()
expressWs(app)

/* Routers must be imported after express-ws is initialized, therefore 'require' syntax */
const PlayRouter = require('./routes/PlayRouter')
const IndexRouter = require('./routes/IndexRouter')
const LoginRouter = require('./routes/LoginRouter')
const GamesRouter = require('./routes/GamesRouter')
const LogoutRouter = require('./routes/LogoutRouter')
const ProfileRouter = require('./routes/ProfileRouter')
const RegisterRouter = require('./routes/RegisterRouter')

/* Templating engine */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

/* Stuff */


/* Random middleware */
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

/* OPTIONS request */
app.use((req: Request, res: Response, next) => {
	if (req.method === 'OPTIONS') {
		res.status(200)
		res.json(JSON.stringify({}))
	} else {
		next()
	}
})

/* HTTP routers */
app.use('/', IndexRouter)
app.use('/games', GamesRouter)
app.use('/login', LoginRouter)
app.use('/logout', LogoutRouter)
app.use('/profile', ProfileRouter)
app.use('/register', RegisterRouter)

/* WS routers */
app.use('/play', PlayRouter)

/* Global error handler */
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
})

/* Global state */
global.database = Database.createConnection()
global.gameLibrary = new GameLibrary()
global.playerLibrary = new PlayerLibrary()

app.listen((process.env.PORT || 3000))
