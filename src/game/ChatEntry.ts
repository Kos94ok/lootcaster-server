
import uuidv4 from 'uuid/v4'
import Player from '../database/Player'

export default class ChatEntry {
	id: string
	sender: Player
	message: string

	constructor(sender: Player, message: string) {
		this.id = uuidv4()
		this.sender = sender
		this.message = message
	}

	static newInstance(sender: Player, message: string): ChatEntry {
		return new ChatEntry(sender, message)
	}
}
