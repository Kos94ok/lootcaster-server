// @flow
import express from 'express'
const router = express.Router()

import Game from '../game/Game'
import GameMessage from '../model/GameMessage'

router.use((req, res, next) => {
	const token = req.params['token']
	if (!token) {
		throw 'Missing token'
	}

	const player = global.playerLibrary.getPlayerByToken(token)
	if (!player) {
		throw 'Token invalid'
	}

	req.player = player
	next()
})

router.get('/', (req, res, next) => {
	const library = global.gameLibrary

	const gameMessages = library.games.map(game => GameMessage.fromGame(game))
	res.json({ data: gameMessages })
})

router.get('/create', (req, res, next) => {
	const player = req.player
	const gameLibrary = global.gameLibrary

	const game = gameLibrary.createOwnedGame(player)
	res.json({ data: GameMessage.fromGame(game) })
})

router.get('/destroy', (req, res, next) => {
	const gameLibrary = global.gameLibrary
	gameLibrary.destroyOwnedGame(req.params.gameId, req.player)

	res.json({ success: true })
})

router.use((err, req, res, next) => {
	res.json({ error: err })
})

module.exports = router
