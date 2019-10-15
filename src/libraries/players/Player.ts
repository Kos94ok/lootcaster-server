import * as ws from 'ws'
import PlayerWebSocket from './PlayerWebSocket'

export default class Player {
	id: string
	username: string
	webSocket: PlayerWebSocket

	constructor(id: string, username: string) {
		this.id = id
		this.username = username
		this.webSocket = null
	}

	registerConnection(ws: ws): void {
		this.webSocket = PlayerWebSocket.newInstance(ws)
	}

	clearConnection(): void {
		this.webSocket = null
	}

	sendMessage(json: { type: string, data: any }): void {
		if (!this.webSocket) {
			console.warn('Trying to send message to disconnected player')
			return
		}
		this.webSocket.send(json)
	}

	isInGame(): boolean {
		return !!this.webSocket
	}

	static newInstance(playerDatabaseEntry: PlayerDatabaseEntry): Player {
		return new Player(playerDatabaseEntry.id, playerDatabaseEntry.username)
	}
}
