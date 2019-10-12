
import uuidv4 from 'uuid/v4'
import Player from '../database/Player'
import ChatEntry from './ChatEntry'

export default class Game {
	id: string
	owner: Player
	players: Player[]
	chatHistory: ChatEntry[]

	constructor(owner: Player) {
		this.id = uuidv4()
		this.owner = owner
		this.players = []
		this.chatHistory = []
	}

	addPlayer(targetPlayer: Player): void {
		if (this.players.includes(targetPlayer)) { return }

		this.players.forEach((player) => player.webSocket.notifyAboutPlayerConnected(targetPlayer))
		this.players.push(targetPlayer)
	}

	removePlayer(targetPlayer: Player): void {
		if (!this.players.includes(targetPlayer)) { return }

		this.players.splice(this.players.indexOf(targetPlayer), 1)
		this.players.forEach((player) => player.webSocket.notifyAboutPlayerDisconnected(targetPlayer))
	}

	createChatEntry(sender: Player, message: string): void {
		const chatEntry = ChatEntry.newInstance(sender, message)
		this.chatHistory.push(chatEntry)
		this.players.forEach((player) => player.webSocket.notifyAboutChatEntry(chatEntry))
	}

	static newPublicInstance(): Game {
		return new Game(null)
	}

	static newOwnedInstance(owner: Player): Game {
		return new Game(owner)
	}
}
