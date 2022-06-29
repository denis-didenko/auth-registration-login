const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');

class TokenService {
    generateTokens(user) {
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return { refreshToken, accessToken };
    }

    async saveToken(userId, refreshToken) {
        const token = await tokenModel.findOne({ userId });
        if (token) {
            await tokenModel.updateOne({ userId }, { refreshToken });
            return;
        }

        const newToken = await tokenModel.create({ user: userId, refreshToken });
        return newToken;
    }

    async removeToken(userId) {
        const token = await tokenModel.findOne({ userId });
        if (!token) {
            return;
        }

        await tokenModel.deleteOne({ userId });
    }

    validateAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }

    validateRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }

    findToken(refreshToken) {
        return tokenModel.findOne({ refreshToken });
    }
}

module.exports = new TokenService();
