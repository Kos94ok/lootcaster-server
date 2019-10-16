
import Game from '../../libraries/game/Game'

export default class GameMessage {
	id: string
	name: string
	owner: string
	playerCount: number

	constructor(game: Game) {
		this.id = game.id
		this.name = game.name
		this.owner = game.owner.username
		this.playerCount = game.players.length
	}

	static fromGame(game: Game): GameMessage {
		return new GameMessage(game)
	}
}
