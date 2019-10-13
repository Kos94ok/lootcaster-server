import express, { Response } from 'express'
const router = express.Router()

import AsyncHandler from '../utils/AsyncHandler'
import PlayerMessage from '../model/PlayerMessage'
import TokenManager from '../database/TokenManager'

router.post('/', AsyncHandler(async (req, res: Response, next) => {
	const username = req.body['username']
	const password = req.body['password']
	if (!username || !password) { throw 'Missing username or password' }

	const player = await global.playerLibrary.login(username, password)
	if (!player) { throw 'Username or password invalid' }

	const playerToken = TokenManager.generateJwtToken(player)
	res.cookie('playerToken', playerToken, { maxAge: 900000, httpOnly: true })
	res.json({ data: PlayerMessage.fromPlayer(player) })
}))

router.use((err, req, res: Response, next) => {
	res.status(400)
	res.json({ error: err })
})

module.exports = router
