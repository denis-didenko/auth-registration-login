const userService = require('../service/user');
const { validationResult } = require('express-validator');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ errors: errors.mapped() });
			}

			const userData = await userService.registration(req.body);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			res.json({ error: e });
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ message: 'Logout successful' });
		} catch (e) {
			next(e);
		}
	}

	async refreshToken(req, res, next) {
		try {
			console.log('req.cookies: ', req.cookies);
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getUsers();
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
