import uuidv4 from 'uuid/v4'
import Bash from '../utils/Bash'
import { Client, QueryResult } from 'pg'

export default class Database {
	client: Client

	async init() {
		let databaseUrl = process.env.DATABASE_URL
		if (!databaseUrl) {
			console.info('Looking for database URL')
			const { stdout } = await Bash.exec('heroku pg:credentials:url DATABASE --app lootcaster')
			databaseUrl = stdout.split('\n').find(line => line.includes('postgres://')).trim()
		}

		console.info('Connecting to database at "' + databaseUrl + '"')
		const client = new Client({
			connectionString: databaseUrl,
			ssl: true,
		})

		await client.connect()
		this.client = client
		console.info('Database connection established')
	}

	getFullTableName(tableName: string): string {
		const prefix = process.env.DATABASE_URL ? '' : 'dev_'
		return prefix + tableName
	}

	async runQuery(query: string): Promise<QueryResult> {
		if (!this.client) { throw 'Database client is not yet ready' }

		return new Promise((resolve, reject) => {
			this.client.query(query, (err, res) => {
				if (err) {
					reject(err)
					return
				}
				resolve(res)
			})
		})
	}



	async insertPlayer(username: string, passwordHash: string): Promise<boolean> {
		const playerId = uuidv4()
		const dbTable = this.getFullTableName('player')
		const query = `INSERT INTO ${dbTable} (id, username, passwordHash) VALUES(\'${playerId}\', \'${username}\', \'${passwordHash}\');`
		try {
			await this.runQuery(query)
		} catch (err) {
			console.log(err)
			return false
		}

		return true
	}



	async selectPlayerById(id: string): Promise<PlayerDatabaseEntry> {
		const dbTable = this.getFullTableName('player')
		const query = `SELECT * FROM ${dbTable} WHERE id = \'${id}\'`
		try {
			const result = await this.runQuery(query)
			if (!result.rows[0]) {
				return null
			}
			return result.rows[0]
		} catch (err) {
			return null
		}
	}

	async selectPlayerByUsername(username: string): Promise<PlayerDatabaseEntry> {
		const dbTable = this.getFullTableName('player')
		const query = `SELECT * FROM ${dbTable} WHERE username = \'${username}\'`
		try {
			const result = await this.runQuery(query)
			if (!result.rows[0]) {
				return null
			}
			return result.rows[0]
		} catch (err) {
			return null
		}
	}



	static createConnection(): Database {
		const database = new Database()
		database.init().then(() => {})
		return database
	}
}
