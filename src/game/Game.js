// @flow
import uuidv4 from 'uuid/v4'
import Player from '../database/Player'

export default class Game {
	id: string
	owner: Player
	players: Array<Player>

	constructor(owner: Player) {
		this.id = uuidv4()
		this.owner = owner
		this.players = []
	}

	addPlayer(player: Player): void {
		this.players.push(player)
	}

	static newPublicInstance() : Game {
		return new Game(null)
	}

	static newOwnedInstance(owner: Player) : Game {
		return new Game(owner)
	}
}
