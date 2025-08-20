import AuthService from "../../service/auth.service.js";

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
    return res.status(200).json({
        message: "User verified."
    })
}