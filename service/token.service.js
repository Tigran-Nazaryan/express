import jwt from "jsonwebtoken";
import {Token} from "../models/models.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "15d"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
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
        return await Token.create({userId, refreshToken, expiresAt});
    }

    async removeToken(refreshToken) {
        return await Token.destroy({
            where: {refreshToken}
        });
    }
    async findToken (refreshToken) {
        return await Token.findOne({
            where: {refreshToken}
        });
    }
}

export default new TokenService();