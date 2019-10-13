import uuidv4 from 'uuid/v4'
import Player from './Player'
import HashManager from './HashManager'
import TokenManager from './TokenManager'
import { JwtTokenScope } from '../enums/JwtTokenScope'

const dbTable = process.env.DATABASE_URL ? 'player' : 'dev_player'

export default class PlayerLibrary {
	players: Array<Player>

	constructor() {
		this.players = []
	}

	async register(username: string, password: string): Promise<boolean> {
		const passwordHash = await HashManager.hashPassword(password)
		const playerId = uuidv4()
		try {
			const query = `INSERT INTO ${dbTable} (id, username, passwordHash) VALUES(\'${playerId}\', \'${username}\', \'${passwordHash}\');`
			await global.database.runQuery(query)
		} catch (err) {
			return false
		}

		return true
	}

	async login(username: string, password: string): Promise<Player> {
		const playerDatabaseEntry = await this.loadPlayerByUsername(username)

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

	async loadPlayerById(id: string): Promise<PlayerDatabaseEntry> {
		try {
			const query = `SELECT * FROM ${dbTable} WHERE id = \'${id}\'`
			const result = await global.database.runQuery(query)
			if (!result.rows[0]) {
				return null
			}
			return result.rows[0]
		} catch (err) {
			return null
		}
	}

	async loadPlayerByUsername(username: string): Promise<PlayerDatabaseEntry> {
		try {
			const query = `SELECT * FROM ${dbTable} WHERE username = \'${username}\'`
			const result = await global.database.runQuery(query)
			if (!result.rows[0]) {
				return null
			}
			return result.rows[0]
		} catch (err) {
			return null
		}
	}

	async getPlayerById(playerId: string): Promise<Player> {
		let player = this.players.find(player => player.id === playerId)
		if (!player) {
			const playerDatabaseEntry = await this.loadPlayerById(playerId)
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
			const playerDatabaseEntry = await this.loadPlayerByUsername(username)
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
