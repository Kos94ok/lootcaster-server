
import Game from './Game'
import Player from '../database/Player'
import OutgoingMessageHandlers from '../handlers/OutgoingMessageHandlers'

export default class GameLibrary {
	games: Array<Game>

	constructor() {
		this.games = []
	}

	public createOwnedGame(owner: Player): Game {
		const game = Game.newOwnedInstance(owner)
		this.games.push(game)
		return game
	}

	private destroyGame(game: Game): void {
		game.players.forEach(player => OutgoingMessageHandlers.notifyAboutGameShutdown(player))

		this.games.splice(this.games.indexOf(game), 1)
	}

	public destroyOwnedGame(id: string, player: Player): void {
		if (!id) { throw 'Missing game ID' }

		const game = this.games.find(game => game.id === id)
		if (!game || game.owner.id !== player.id) { throw 'Invalid game ID' }

		this.destroyGame(game)
	}
}
