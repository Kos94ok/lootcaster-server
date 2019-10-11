// @flow
import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
	const username = req.params['username']
	const password = req.params['password']
	if (!username || !password) {
		res.json({ error: 'Missing username or password' })
		return
	}

	const playerLibrary = global.playerLibrary
	const player = playerLibrary.getPlayerByUsername(username, password)
	if (!player) {
		res.json({ error: 'User already exists' })
		return
	}

	playerLibrary.register(username, password)
	res.json({ success: true })
})

module.exports = router
