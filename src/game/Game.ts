
import uuidv4 from 'uuid/v4'
import ChatEntry from './ChatEntry'
import Player from '../database/Player'
import OutgoingMessageHandlers from '../handlers/OutgoingMessageHandlers'

export default class Game {
	id: string
	name: string
	owner: Player
	players: Player[]
	chatHistory: ChatEntry[]

	constructor(owner: Player, name: string) {
		this.id = uuidv4()
		this.name = name
		this.owner = owner
		this.players = []
		this.chatHistory = []
	}

	addPlayer(targetPlayer: Player): void {
		if (this.players.includes(targetPlayer)) { return }

		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutPlayerConnected(player, targetPlayer))
		this.players.push(targetPlayer)
	}

	removePlayer(targetPlayer: Player): void {
		if (!this.players.includes(targetPlayer)) { return }

		this.players.splice(this.players.indexOf(targetPlayer), 1)
		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutPlayerDisconnected(player, targetPlayer))
	}

	createChatEntry(sender: Player, message: string): void {
		const chatEntry = ChatEntry.newInstance(sender, message)
		this.chatHistory.push(chatEntry)
		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutChatEntry(player, chatEntry))
	}

	static newServerInstance(): Game {
		return new Game(null, 'Unnamed public game')
	}

	static newOwnedInstance(owner: Player, name: string): Game {
		return new Game(owner, name)
	}
}
