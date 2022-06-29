const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const ApiError = require('../api-custom-error');
const UserDto = require('../dtos/user');
const tokenService = require('./token');

class UserService {
	async registration({ email, password, firstName, lastName }) {
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw new ApiError(400, 'email', 'User with this email already exists');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const user = await UserModel.create({ email, password: hashPassword, firstName, lastName });
		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw new ApiError(400, 'email', 'User with this email does not exist');
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new ApiError(400, 'password', 'Invalid password');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		console.log('tokens: ', tokens);
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(userId) {
		await tokenService.removeToken(userId);
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			console.log('1');
			throw new ApiError(401, 'refreshToken', 'User is not authorized');
		}

		const validated = tokenService.validateRefreshToken(refreshToken);
		const token = await tokenService.findToken(refreshToken);
		if (!token || !validated) {
			console.log('2');
			throw new ApiError(401, 'refreshToken', 'User is not authorized');
		}

		const user = await UserModel.findById(validated.userId);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async getUsers() {
		return await UserModel.find();
	}
}

module.exports = new UserService();
