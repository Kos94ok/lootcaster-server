import Game from '../game/Game'
import Player from '../database/Player'
import ChatEntry from '../game/ChatEntry'
import ChatEntryMessage from '../models/ChatEntryMessage'
import PublicPlayerMessage from '../models/PublicPlayerMessage'

export default {
	sendAllChatHistory: (player: Player, game: Game) => {
		const chatEntryMessages = game.chatHistory.map(chatEntry => ChatEntryMessage.fromChatEntry(chatEntry))
		player.sendMessage({
			type: 'gameState/chat',
			data: chatEntryMessages
		})
	},

	sendAllConnectedPlayers: (player: Player, game: Game) => {
		const publicPlayerMessages = game.players.map(player => PublicPlayerMessage.fromPlayer(player))
		player.sendMessage({
			type: 'gameState/players',
			data: publicPlayerMessages
		})
	},

	notifyAboutChatEntry(player: Player, chatEntry: ChatEntry) {
		player.sendMessage({
			type: 'chat/message',
			data: ChatEntryMessage.fromChatEntry(chatEntry)
		})
	},

	notifyAboutPlayerConnected(player: Player, connectedPlayer: Player) {
		player.sendMessage({
			type: 'update/playerConnected',
			data: PublicPlayerMessage.fromPlayer(connectedPlayer)
		})
	},

	notifyAboutPlayerDisconnected(player: Player, disconnectedPlayer: Player) {
		player.sendMessage({
			type: 'update/playerDisconnected',
			data: PublicPlayerMessage.fromPlayer(disconnectedPlayer)
		})
	},

	notifyAboutGameShutdown(player: Player) {
		player.sendMessage({
			type: 'command/disconnect',
			data: { reason: 'Game shutdown' }
		})
	}
}
