import Player from './Player'
import Database from './Database'
import HashManager from './HashManager'
import TokenManager from './TokenManager'
import { JwtTokenScope } from '../enums/JwtTokenScope'

export default class PlayerLibrary {
	players: Array<Player>
	database: Database

	constructor(database: Database) {
		this.players = []
		this.database = database
	}

	async register(username: string, password: string): Promise<boolean> {
		const passwordHash = await HashManager.hashPassword(password)
		return this.database.insertPlayer(username, passwordHash)
	}

	async login(username: string, password: string): Promise<Player> {
		const playerDatabaseEntry = await this.database.selectPlayerByUsername(username)

		if (!playerDatabaseEntry) {
			return null
		}

		const passwordsMatch = await HashManager.passwordsMatch(password, playerDatabaseEntry.passwordhash)
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
			const playerDatabaseEntry = await this.database.selectPlayerById(playerId)
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
			const playerDatabaseEntry = await this.database.selectPlayerByUsername(username)
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
