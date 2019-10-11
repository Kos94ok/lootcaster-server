// @flow
import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	const games = global.gameLibrary.games

	const params = {
		activeGameCount: games.length,
		activePlayerCount: games.reduce((acc, game) => acc += game.players.length, 0)
	}

	res.render('index', params)
})

module.exports = router
