import Vector2D from '../../models/Vector2D'
import Entity from '../../libraries/game/Entity'
import EntityAction from '../../libraries/game/EntityAction'
import { EntityActionType } from '../../enums/EntityActionType'

export default class EntityActionMessage {
	entityId: string
	type: EntityActionType
	targetEntityId: string
	targetPosition: Vector2D

	constructor(entity: Entity, entityAction: EntityAction) {
		this.entityId = entity.id
		this.type = entityAction.type
		if (entityAction.targetEntity) {
			this.targetEntityId = entityAction.targetEntity.id
		}
		this.targetPosition = entityAction.targetPosition
	}

	static fromEntityAction(entity: Entity, entityAction: EntityAction) {
		return new EntityActionMessage(entity, entityAction)
	}
}
