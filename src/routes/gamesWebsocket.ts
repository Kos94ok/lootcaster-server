
import express from 'express'
import Game from '../game/Game'
import Player from '../database/Player'
import ChatEntryMessage from '../model/ChatEntryMessage'
import PublicPlayerMessage from '../model/PublicPlayerMessage'

const router = express.Router()

const messages = {
	gameState: {
		chat(game: Game): { type: string; data: ChatEntryMessage[] } {
			const chatEntryMessages = game.chatHistory.map(chatEntry => ChatEntryMessage.fromChatEntry(chatEntry))
			return { type: 'gameState/chat', data: chatEntryMessages }
		},

		players(game: Game): { type: string; data: PublicPlayerMessage[] } {
			const publicPlayerMessages = game.players.map(player => PublicPlayerMessage.fromPlayer(player))
			return { type: 'gameState/players', data: publicPlayerMessages }
		}
	}
}

const handlers = {
	'get/chat': (data: void, game: Game, player: Player) => {
		return messages.gameState.chat(game)
	},

	'get/players': (data: void, game: Game, player: Player) => {
		return messages.gameState.players(game)
	},

	'post/chat': (data: string, game: Game, player: Player) => {
		game.createChatEntry(player, data)
	}
}

router.ws('/:gameId', (ws, req) => {
	const currentGame: Game = global.gameLibrary.games.find(game => game.id === req.params.gameId)
	const currentPlayer: Player = global.playerLibrary.players.find(player => player.uniqueToken === req.cookies['playerToken'])
	if (!currentGame || !currentPlayer) {
		ws.send(JSON.stringify({ error: 'Invalid game ID or player token' }))
		ws.close()
		return
	}

	currentGame.addPlayer(currentPlayer)
	currentPlayer.registerConnection(ws)

	ws.on('message', (rawMsg: string) => {
		const msg = JSON.parse(rawMsg)
		const handler = handlers[msg.type]
		if (!handler) {
			ws.send(JSON.stringify({ error: 'Invalid type' }))
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
	console.log(err)
})

module.exports = router
