import express, { Response } from 'express'
const router = express.Router()

import GameMessage from '../models/GameMessage'
import RequirePlayerTokenMiddleware from '../middleware/RequirePlayerTokenMiddleware'
import SendErrorAsBadRequestMiddleware from '../middleware/SendErrorAsBadRequestMiddleware'

router.use(RequirePlayerTokenMiddleware)

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

router.use(SendErrorAsBadRequestMiddleware)

module.exports = router
