// @flow
import express from 'express'
const router = express.Router()

import Game from '../game/Game'
import GameMessage from '../model/GameMessage'
import PlayerMessage from '../model/PlayerMessage'

router.use((req, res, next) => {
	const username = req.params['username']
	const password = req.params['password']
	if (!username || !password) {
		res.json({ error: 'Missing username or password' })
		return
	}

	const player = global.playerLibrary.getPlayerByUsername(username, password)
	if (!player) {
		res.json({ error: 'Username or password invalid' })
		return
	}

	req.player = player
	next()
})

router.get('/', (req, res, next) => {
	const player = req.player
	const playerMessage = PlayerMessage.fromPlayer(player)
})

module.exports = router
