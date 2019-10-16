import Game from '../libraries/game/Game'
import Player from '../libraries/players/Player'
import EntityAction from '../libraries/game/EntityAction'
import OutgoingMessageHandlers from './OutgoingMessageHandlers'
import EntityActionMessage from '../models/messages/EntityActionMessage'

export default {
	'get/chat': (data: void, game: Game, player: Player) => {
		OutgoingMessageHandlers.sendAllChatHistory(player, game)
	},

	'get/players': (data: void, game: Game, player: Player) => {
		OutgoingMessageHandlers.sendAllConnectedPlayers(player, game)
	},

	'get/entities': (data: void, game: Game, player: Player) => {
		OutgoingMessageHandlers.sendAllPresentEntities(player, game)
	},

	'post/chat': (data: string, game: Game, player: Player) => {
		game.createChatEntry(player, data)
	},

	'post/order': (data: EntityActionMessage, game: Game, player: Player) => {
		const orderedEntity = game.entities.find(data.entityId)
		if (!orderedEntity || orderedEntity.owner != player) {
			return
		}

		const targetEntity = game.entities.find(data.targetEntityId)
		const entityAction = EntityAction.anyTarget(data.type, targetEntity, data.targetPosition)
		game.entities.order(orderedEntity, entityAction)
	},

	'system/keepalive': (data: string, game: Game, player: Player) => {
		// No action needed
	}
}
