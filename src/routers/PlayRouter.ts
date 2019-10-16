import express from 'express'
import Game from '../libraries/game/Game'
import Entity from '../libraries/game/Entity'
import Player from '../libraries/players/Player'
import IncomingMessageHandlers from '../handlers/IncomingMessageHandlers'

const router = express.Router()

router.ws('/:gameId', async (ws, req) => {
	const currentGame: Game = global.gameLibrary.games.find(game => game.id === req.params.gameId)
	const currentPlayer: Player = await global.playerLibrary.getPlayerByJwtToken(req.cookies['playerToken'])
	if (!currentGame || !currentPlayer) {
		ws.send(JSON.stringify({ type: 'error/generic', data: 'Invalid game ID or player token' }))
		ws.close()
		return
	}

	currentPlayer.disconnect()

	currentGame.addPlayer(currentPlayer)
	currentPlayer.registerConnection(ws)

	const heroEntity = Entity.newInstance(currentPlayer, 'hero')
	heroEntity.moveTo({ x: Math.random() * 256, y: Math.random() * 256 })
	currentGame.entities.create(heroEntity)

	ws.on('message', (rawMsg: string) => {
		const msg = JSON.parse(rawMsg)
		const handler = IncomingMessageHandlers[msg.type]
		if (!handler) {
			ws.send(JSON.stringify({ type: 'error/generic', data: 'Invalid type' }))
			return
		}

		const response = handler(msg.data, currentGame, currentPlayer)
		if (response) {
			ws.send(JSON.stringify(response))
		}
	})

	ws.on('close', () => {
		currentGame.removePlayer(currentPlayer)
	})
})

router.use((err, req, res, next) => {
	console.error(err)
})

module.exports = router
