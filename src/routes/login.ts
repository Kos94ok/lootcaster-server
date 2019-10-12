import express, { Response } from 'express'
const router = express.Router()

import Game from '../game/Game'
import GameMessage from '../model/GameMessage'
import Player from '../database/Player'
import PlayerMessage from '../model/PlayerMessage'

router.use((req, res: Response, next) => {
	const username = req.body['username']
	const password = req.body['password']
	if (!username || !password) {
		res.json({ error: 'Missing username or password' })
		return
	}

	const player = global.playerLibrary.getPlayerByUsername(username, password)
	if (!player) {
		res.json({ error: 'Username or password invalid' })
		return
	}

	req['player'] = player
	next()
})

router.post('/', (req, res: Response, next) => {
	const player: Player = req['player']
	res.cookie('playerToken', player.uniqueToken, { maxAge: 900000, httpOnly: true })
	res.json(PlayerMessage.fromPlayer(player))
})

module.exports = router
