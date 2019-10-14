
import Game from '../game/Game'

export default class GameMessage {
	id: string
	name: string
	owner: string

	constructor(game: Game) {
		this.id = game.id
		this.name = game.name
		this.owner = game.owner.username
	}

	static fromGame(game: Game): GameMessage {
		return new GameMessage(game)
	}
}
