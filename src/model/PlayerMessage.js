// @flow
import Player from '../database/Player'

export default class PlayerMessage {
	username: string
	uniqueToken: string

	constructor(player: Player) {
		this.username = player.username
		this.uniqueToken = player.uniqueToken
	}

	static fromPlayer(player: Player): PlayerMessage {
		return new PlayerMessage(player)
	}
}
