import express, { Response } from 'express'
const router = express.Router()

import AsyncHandler from '../utils/AsyncHandler'
import PlayerMessage from '../model/PlayerMessage'

router.use(AsyncHandler(async (req, res, next) => {
	const token = req.cookies['playerToken']
	if (!token) { throw 'Missing token' }

	const player = await global.playerLibrary.getPlayerByJwtToken(token)
	if (!player) { throw 'Token invalid' }

	req['player'] = player
	next()
}))

router.get('/', (req, res: Response, next) => {
	const player = req['player']
	res.json({ data: PlayerMessage.fromPlayer(player) })
})

router.use((err, req, res: Response, next) => {
	res.status(400)
	res.json({ error: err })
})

module.exports = router
