
import Game from '../game/Game'

export default class GameMessage {
	id: string

	constructor(game: Game) {
		this.id = game.id
	}

	static fromGame(game: Game): GameMessage {
		return new GameMessage(game)
	}
}
