import AsyncHandler from '../utils/AsyncHandler'

export default AsyncHandler(async (req, res, next) => {
	const token = req.cookies['playerToken']
	if (!token) { throw 'Missing token' }

	const player = await global.playerLibrary.getPlayerByJwtToken(token)
	if (!player) { throw 'Token invalid' }

	req['player'] = player
	next()
})
