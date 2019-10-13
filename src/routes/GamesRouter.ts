import express, { Response } from 'express'
const router = express.Router()

import Game from '../game/Game'
import GameMessage from '../model/GameMessage'
import AsyncHandler from '../utils/AsyncHandler'

router.use(AsyncHandler(async (req, res, next) => {
	const token = req.cookies['playerToken']
	if (!token) { throw 'Missing token' }

	const player = await global.playerLibrary.getPlayerByJwtToken(token)
	if (!player) { throw 'Token invalid' }

	req['player'] = player
	next()
}))

router.get('/', (req, res: Response, next) => {
	const library = global.gameLibrary

	const gameMessages = library.games.map(game => GameMessage.fromGame(game))
	res.json({ data: gameMessages })
})

router.put('/', (req, res: Response, next) => {
	const player = req['player']
	const gameLibrary = global.gameLibrary

	const game = gameLibrary.createOwnedGame(player)
	res.json({ data: GameMessage.fromGame(game) })
})

router.delete('/:gameId', (req, res: Response, next) => {
	const gameLibrary = global.gameLibrary
	gameLibrary.destroyOwnedGame(req.params.gameId, req['player'])

	res.json({ success: true })
})

router.use((err, req, res: Response, next) => {
	res.status(400)
	res.json({ error: err })
})

module.exports = router
