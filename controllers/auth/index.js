import AuthService from "../../service/auth.service.js";
import {User} from "../../models/models.js";

export const registration = async (req, res, next) => {
    try {
        const {email, password, firstName, lastName} = req.body;
        const userData = await AuthService.registration(email, password, firstName, lastName);
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const token = await AuthService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        console.log('Login request body:', req.body);
        const userData = await AuthService.login(email, password);
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies;
        const userData = await AuthService.refresh(refreshToken);
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const verify = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id'] });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}