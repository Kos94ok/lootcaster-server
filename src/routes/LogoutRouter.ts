import AsyncHandler from '../utils/AsyncHandler'

import express, { Response } from 'express'
const router = express.Router()

router.post('/', AsyncHandler(async (req, res: Response, next) => {
	res.cookie('playerToken', '', { maxAge: Date.now(), httpOnly: true })
	res.json({ success: true })
}))

module.exports = router
