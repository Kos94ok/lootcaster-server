// @flow
import Player from './Player'

export default class PlayerLibrary {
	players: Array<Player>

	constructor() {
		this.players = []
	}

	register(username: string, password: string) : Player {
		// TODO: Hash the password please
		const passwordHash = '$1' + password
		const player = Player.newInstance(username, passwordHash)
		this.players.push(player)
		return player
	}

	getPlayerByUsername(username: string, password: string) : Player {
		const player = this.players.find(player => player.username === username)
		if (!player) {
			return null
		}

		const passwordHash = '$1' + password
		if (player.passwordHash !== passwordHash) {
			return null
		}

		return player
	}

	getPlayerByToken(token: string) : Player {
		return this.players.find(player => player.uniqueToken === token)
	}
}
