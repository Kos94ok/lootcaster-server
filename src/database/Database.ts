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

	async runQuery(query: string): Promise<QueryResult> {
		console.log(process.env.DATABASE_URL)
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

	static createConnection(): Database {
		const database = new Database()
		database.init().then(() => {})
		return database
	}
}
