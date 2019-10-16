import Game from './Game'
import Entity from './Entity'
import Player from '../players/Player'
import EntityAction from './EntityAction'
import OutgoingMessageHandlers from '../../handlers/OutgoingMessageHandlers'

export default class GameEntities {
	game: Game
	objects: Entity[]

	constructor(game: Game) {
		this.game = game
		this.objects = []
	}

	get(): Entity[] {
		return this.objects
	}

	find(id: string): Entity {
		return this.objects.find(entity => entity.id === id)
	}

	create(entity: Entity): void {
		if (!this.game.players.includes(entity.owner)) {
			console.warn('Trying to create an entity with owner that does not belong to this game')
			return
		}

		this.objects.push(entity)
		this.game.players.forEach((player) => OutgoingMessageHandlers.notifyAboutEntityCreated(player, entity))
	}

	order(entity: Entity, action: EntityAction): void {
		if (!this.objects.includes(entity)) {
			console.warn('Trying to issue an order to a non-existent entity')
			return
		}

		entity.issueOrder(action)
		this.game.players.forEach(player => OutgoingMessageHandlers.notifyAboutEntityOrder(player, entity, action))
	}

	destroy(entity: Entity): void {
		if (!this.objects.includes(entity)) {
			console.warn('Trying to destroy a non-existent entity')
			return
		}

		const entityIndex = this.objects.indexOf(entity)
		this.objects.splice(entityIndex, 1)

		this.game.players.forEach((player) => OutgoingMessageHandlers.notifyAboutEntityDestroyed(player, entity))
	}

	destroyByOwner(owner: Player): void {
		this.objects.filter(entity => entity.owner.id === owner.id).forEach(entity => this.destroy(entity))
	}
}
