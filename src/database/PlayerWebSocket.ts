import * as ws from 'ws'
import Player from './Player'
import ChatEntry from '../game/ChatEntry'
import ChatEntryMessage from '../model/ChatEntryMessage'
import PublicPlayerMessage from '../model/PublicPlayerMessage'

export default class PlayerWebSocket {
	ws: ws

	constructor(webSocket: ws) {
		this.ws = webSocket
	}

	send(json: Record<string, any>): void {
		this.ws.send(JSON.stringify(json))
	}

	notifyAboutPlayerConnected(player: Player): void {
		this.send({
			type: 'update/playerConnected',
			data: PublicPlayerMessage.fromPlayer(player)
		})
	}

	notifyAboutPlayerDisconnected(player: Player): void {
		this.send({
			type: 'update/playerDisconnected',
			data: PublicPlayerMessage.fromPlayer(player)
		})
	}

	notifyAboutChatEntry(chatEntry: ChatEntry): void {
		this.send({
			type: 'chat/message',
			data: ChatEntryMessage.fromChatEntry(chatEntry)
		})
	}

	static newInstance(ws: ws): PlayerWebSocket {
		return new PlayerWebSocket(ws)
	}
}
