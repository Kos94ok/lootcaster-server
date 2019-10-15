import Game from '../libraries/game/Game'
import Player from '../libraries/players/Player'
import OutgoingMessageHandlers from './OutgoingMessageHandlers'

export default {
	'get/chat': (data: void, game: Game, player: Player) => {
		OutgoingMessageHandlers.sendAllChatHistory(player, game)
	},

	'get/players': (data: void, game: Game, player: Player) => {
		OutgoingMessageHandlers.sendAllConnectedPlayers(player, game)
	},

	'post/chat': (data: string, game: Game, player: Player) => {
		game.createChatEntry(player, data)
	},

	'system/keepalive': (data: string, game: Game, player: Player) => {
		// No action needed
	}
}
