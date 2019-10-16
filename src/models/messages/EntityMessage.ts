import Vector2D from '../Vector2D'
import Entity from '../../libraries/game/Entity'
import Player from '../../libraries/players/Player'
import EntityActionMessage from './EntityActionMessage'

export default class EntityMessage {
	id: string
	isOwner: boolean
	position: Vector2D
	entityClass: string
	currentAction: EntityActionMessage

	constructor(entity: Entity, isOwner: boolean) {
		this.id = entity.id
		this.isOwner = isOwner
		this.position = entity.position
		this.entityClass = entity.entityClass
		this.currentAction = EntityActionMessage.fromEntityAction(entity, entity.currentAction)
	}

	static fromEntity(entity: Entity, targetPlayer: Player): EntityMessage {
		const isOwner = entity.owner.id === targetPlayer.id
		return new EntityMessage(entity, isOwner)
	}
}
