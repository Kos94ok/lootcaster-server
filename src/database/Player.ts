import * as ws from 'ws'
import uuidv4 from 'uuid/v4'
import PlayerWebSocket from './PlayerWebSocket'

export default class Player {
	id: string
	username: string
	passwordHash: string
	uniqueToken: string
	webSocket: PlayerWebSocket

	constructor(username: string, passwordHash: string) {
		this.id = uuidv4()
		this.username = username
		this.passwordHash = passwordHash
		this.uniqueToken = uuidv4()
		this.webSocket = null
	}

	registerConnection(ws: ws): void {
		this.webSocket = PlayerWebSocket.newInstance(ws)
	}

	clearConnection(): void {
		this.webSocket = null
	}

	isInGame(): boolean {
		return !!this.webSocket
	}

	static newInstance(username: string, passwordHash: string): Player {
		return new Player(username, passwordHash)
	}
}
