import Player from '../players/Player'
import Vector2D from '../../models/Vector2D'
import { EntityAction } from '../../enums/EntityAction'

export default class Entity {
	id: string
	owner: Player
	position: Vector2D
	entityClass: string
	currentAction: EntityAction

	constructor(id: string, owner: Player, entityClass: string) {
		this.id = id
		this.owner = owner
		this.position = Vector2D.empty()
		this.entityClass = entityClass
		this.currentAction = EntityAction.IDLE
	}

	static newInstance(id: string, owner: Player, entityClass: string): Entity {
		return new Entity(id, owner, entityClass)
	}
}
