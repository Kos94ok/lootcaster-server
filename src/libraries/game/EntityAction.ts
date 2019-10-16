import Entity from './Entity'
import Vector2D from '../../models/Vector2D'
import { EntityActionType } from '../../enums/EntityActionType'

export default class EntityAction {
	type: EntityActionType
	targetEntity: Entity
	targetPosition: Vector2D

	constructor(type: EntityActionType, targetEntity: Entity, targetPosition: Vector2D) {
		this.type = type
		this.targetEntity = targetEntity
		this.targetPosition = targetPosition
	}

	static noTarget(type: EntityActionType): EntityAction {
		return new EntityAction(type, null, null)
	}

	static targetEntity(type: EntityActionType, targetEntity: Entity): EntityAction {
		return new EntityAction(type, targetEntity, null)
	}

	static targetPosition(type: EntityActionType, targetPosition: Vector2D): EntityAction {
		return new EntityAction(type, null, targetPosition)
	}

	static anyTarget(type: EntityActionType, targetEntity: Entity, targetPosition: Vector2D): EntityAction {
		if (targetEntity) {
			return EntityAction.targetEntity(type, targetEntity)
		} else if (targetPosition) {
			return EntityAction.targetPosition(type, targetPosition)
		}
		return EntityAction.noTarget(type)
	}
}
