import * as ws from 'ws'

export default class PlayerWebSocket {
	ws: ws

	constructor(webSocket: ws) {
		this.ws = webSocket
	}

	send(json: Record<string, any>): void {
		this.ws.send(JSON.stringify(json))
	}

	static newInstance(ws: ws): PlayerWebSocket {
		return new PlayerWebSocket(ws)
	}
}
