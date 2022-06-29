const ApiError = require('../api-custom-error');

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			console.log('3');
			throw new ApiError(401, 'token', 'User is not authorized');
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			console.log('4');
			throw new ApiError(401, 'token', 'User is not authorized');
		}
		const user = tokenService.validateAccessToken(accessToken);
		if (!user) {
			console.log('5');
			throw new ApiError(401, 'token', 'User is not authorized');
		}

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
