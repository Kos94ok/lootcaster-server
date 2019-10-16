import uuidv4 from 'uuid/v4'
import Player from '../players/Player'
import EntityAction from './EntityAction'
import Vector2D from '../../models/Vector2D'
import {EntityActionType} from '../../enums/EntityActionType'

export default class Entity {
	id: string
	owner: Player
	position: Vector2D
	entityClass: string
	currentAction: EntityAction

	constructor(owner: Player, entityClass: string) {
		this.id = uuidv4()
		this.owner = owner
		this.position = Vector2D.empty()
		this.entityClass = entityClass
		this.currentAction = EntityAction.noTarget(EntityActionType.IDLE)
	}

	public moveTo(position: Vector2D): void {
		this.position = position
	}

	public issueOrder(action: EntityAction): void {
		this.currentAction = action
	}

	static newInstance(owner: Player, entityClass: string): Entity {
		return new Entity(owner, entityClass)
	}
}
