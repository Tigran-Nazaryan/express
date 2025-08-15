import userService from "../../service/user-service.js";

export const registration = async (req, res, next) => {
    try {
        const {email, password, firstName, lastName} = req.body;
        const userData = await userService.registration(email, password, firstName, lastName);
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users)
    } catch (e) {
        next(e);
    }
}