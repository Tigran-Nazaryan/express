import jwt from "jsonwebtoken";
import {Token} from "../models/models.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30s"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const tokenData = await Token.findOne({
            where: {userId: userId}
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({userId, refreshToken, expiresAt});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({
            where: {refreshToken}
        });
        return tokenData;
    }
    async findToken (refreshToken) {
        const tokenData = await Token.findOne({
            where: {refreshToken}
        });
        return tokenData;
    }
}

export default new TokenService();