// @flow
import uuidv4 from 'uuid/v4'

export default class Player {
	id: string
	username: string
	passwordHash: string
	uniqueToken: string

	constructor(username: string, passwordHash: string) {
		this.id = uuidv4()
		this.username = username
		this.passwordHash = passwordHash
		this.uniqueToken = uuidv4()
	}

	static newInstance(username: string, passwordHash: string) : Player {
		return new Player(username, passwordHash)
	}
}
