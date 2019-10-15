import Player from './Player'
import Database from '../../database/Database'
import PlayerDatabase from '../../database/PlayerDatabase'
import HashManager from '../../services/HashService'
import TokenManager from '../../services/TokenService'
import { JwtTokenScope } from '../../enums/JwtTokenScope'

export default class PlayerLibrary {
	players: Array<Player>

	constructor() {
		this.players = []
	}

	async register(username: string, password: string): Promise<boolean> {
		const passwordHash = await HashManager.hashPassword(password)
		return PlayerDatabase.insertPlayer(username, passwordHash)
	}

	async login(username: string, password: string): Promise<Player> {
		const playerDatabaseEntry = await PlayerDatabase.selectPlayerByUsername(username)

		if (!playerDatabaseEntry) {
			return null
		}

		const passwordsMatch = await HashManager.passwordsMatch(password, playerDatabaseEntry.passwordHash)
		if (!passwordsMatch) {
			return null
		}

		const player = Player.newInstance(playerDatabaseEntry)
		this.players.push(player)
		return player
	}

	async getPlayerById(playerId: string): Promise<Player> {
		let player = this.players.find(player => player.id === playerId)
		if (!player) {
			const playerDatabaseEntry = await PlayerDatabase.selectPlayerById(playerId)
			if (!playerDatabaseEntry) {
				return null
			}
			player = Player.newInstance(playerDatabaseEntry)
			this.players.push(player)
		}
		return player
	}

	async getPlayerByUsername(username: string): Promise<Player> {
		let player = this.players.find(player => player.username === username)
		if (!player) {
			const playerDatabaseEntry = await PlayerDatabase.selectPlayerByUsername(username)
			if (!playerDatabaseEntry) {
				return null
			}
			player = Player.newInstance(playerDatabaseEntry)
			this.players.push(player)
		}
		return player
	}

	async getPlayerByJwtToken(token: string): Promise<Player> {
		const tokenPayload = await TokenManager.verifyToken(token, [JwtTokenScope.AUTH])
		if (!tokenPayload) {
			return null
		}
		return this.getPlayerById(tokenPayload.playerId)
	}
}
