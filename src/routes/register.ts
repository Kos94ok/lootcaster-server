
import express, {Response} from 'express'
const router = express.Router()

router.post('/', (req, res: Response, next) => {
	const username = req.body['username']
	const password = req.body['password']
	if (!username || !password) { throw 'Missing username or password' }

	const playerLibrary = global.playerLibrary
	const player = playerLibrary.getPlayerByUsername(username, password)
	if (player) { throw 'User already exists' }

	playerLibrary.register(username, password)
	res.json({ success: true })
})

router.use((err, req, res: Response, next) => {
	res.status(400)
	res.json({ error: err })
})

module.exports = router
