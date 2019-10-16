import Game from '../libraries/game/Game'
import ChatEntry from '../models/ChatEntry'
import Entity from '../libraries/game/Entity'
import Player from '../libraries/players/Player'
import EntityAction from '../libraries/game/EntityAction'
import EntityMessage from '../models/messages/EntityMessage'
import ChatEntryMessage from '../models/messages/ChatEntryMessage'
import PublicPlayerMessage from '../models/messages/PublicPlayerMessage'
import EntityActionMessage from '../models/messages/EntityActionMessage'

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

	 sendAllPresentEntities: (player: Player, game: Game) => {
		const entityMessages = game.entities.get().map(entity => EntityMessage.fromEntity(entity, player))
		player.sendMessage({
			type: 'gameState/entities',
			data: entityMessages
		})
	},

	notifyAboutChatEntry(player: Player, chatEntry: ChatEntry) {
		player.sendMessage({
			type: 'chat/message',
			data: ChatEntryMessage.fromChatEntry(chatEntry)
		})
	},

	notifyAboutEntityCreated(player: Player, entity: Entity) {
		player.sendMessage({
			type: 'update/entityCreated',
			data: EntityMessage.fromEntity(entity, player)
		})
	},
	notifyAboutEntityOrder(player: Player, entity: Entity, entityAction: EntityAction) {
		player.sendMessage({
			type: 'update/entityOrder',
			data: EntityActionMessage.fromEntityAction(entity, entityAction)
		})
	},
	notifyAboutEntityDestroyed(player: Player, entity: Entity) {
		player.sendMessage({
			type: 'update/entityDestroyed',
			data: EntityMessage.fromEntity(entity, player)
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
