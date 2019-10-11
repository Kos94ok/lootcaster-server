// @flow
import express from 'express'
const router = express.Router()

const handlers = {
	['get/state'](msg, req) {
		const games = global.gameLibrary.games
		const targetGame = games.find(game => game.id === msg.gameId)
		if (!targetGame) {
			return { error: 'Invalid game ID' }
		}

		const targetPlayer =

		targetGame.addPlayer()
	}
}

router.ws('/', (ws, req) => {
	ws.on('message', (msg) => {
		const json = JSON.parse(msg)
		const type = json.type
		const handler = handlers[type]
		if (!handler) {
			ws.send({ error: 'Invalid type' })
			return
		}

		const response = handler(msg, req)
		ws.send(response)
	})
})

module.exports = router
