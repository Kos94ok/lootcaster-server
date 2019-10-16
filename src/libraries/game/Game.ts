import uuidv4 from 'uuid/v4'
import Player from '../players/Player'
import GameEntities from './GameEntities'
import ChatEntry from '../../models/ChatEntry'
import OutgoingMessageHandlers from '../../handlers/OutgoingMessageHandlers'

export default class Game {
	id: string
	name: string
	owner: Player
	players: Player[]
	entities: GameEntities
	chatHistory: ChatEntry[]

	constructor(owner: Player, name: string) {
		this.id = uuidv4()
		this.name = name
		this.owner = owner
		this.players = []
		this.entities = new GameEntities(this)
		this.chatHistory = []
	}

	addPlayer(targetPlayer: Player): void {
		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutPlayerConnected(player, targetPlayer))
		this.players.push(targetPlayer)
	}
	removePlayer(targetPlayer: Player): void {
		const registeredPlayer = this.players.find(player => player.id === targetPlayer.id)
		if (!registeredPlayer) {
			return
		}

		this.entities.destroyByOwner(targetPlayer)
		this.players.splice(this.players.indexOf(registeredPlayer), 1)
		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutPlayerDisconnected(player, targetPlayer))
	}

	createChatEntry(sender: Player, message: string): void {
		const chatEntry = ChatEntry.newInstance(sender, message)
		this.chatHistory.push(chatEntry)
		this.players.forEach((player) => OutgoingMessageHandlers.notifyAboutChatEntry(player, chatEntry))
	}

	static newOwnedInstance(owner: Player, name: string): Game {
		const randomNumber = Math.floor(1000 + Math.random() * 9000)
		name = name || (owner.username + `'s game #${randomNumber}`)
		return new Game(owner, name)
	}
}
