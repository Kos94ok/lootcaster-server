import Player from '../libraries/players/Player'
import jwt from 'jsonwebtoken'
import { JwtTokenScope } from '../enums/JwtTokenScope'

const jwtSecret = process.env.JWT_KEY || 'jwtSecret'

export default {
	generateJwtToken(player: Player): string {
		const tokenPayload = {
			scope: [JwtTokenScope.AUTH],
			playerId: player.id
		}
		return jwt.sign(tokenPayload, jwtSecret, {
			issuer: 'Tianara'
		})
	},

	async verifyToken(token: string, expectedScope: JwtTokenScope[]): Promise<Record<string, any> | null> {
		let payload = undefined
		try {
			payload = jwt.verify(token, jwtSecret)
		} catch (error) {
			return null
		}

		if (typeof (payload) === 'string') {
			return null
		}
		const tokenScope: JwtTokenScope[] = payload['scope']
		const scopesMatch = expectedScope.every(scope => tokenScope.includes(scope))
		if (!scopesMatch) {
			return null
		}
		return payload
	}
}
