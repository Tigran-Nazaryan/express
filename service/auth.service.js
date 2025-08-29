import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import {UserDto} from "../dtos/user-dto.js";
import {registrationSchema} from "../validations/registration.validation.js";
import tokenService from "./token-service.js";
import ApiError from "../exceptions/api-error.js";

class AuthService {
    async registration(email, password, firstName, lastName) {

        const {error} = registrationSchema.validate({email, password, firstName, lastName});

        if (error) {
            throw new Error(error.details[0].message);
        }

        const candidate = await User.findOne({
            where: {email}
        });
        if (candidate) {
            throw ApiError.BadRequestError("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({email, password: hashPassword, firstName, lastName});
        const userDto = new UserDto(user);

        return {
            user: userDto,
        };
    }

    async login(email, password) {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw ApiError.BadRequestError("User with this email was not found.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw ApiError.BadRequestError("Incorrect password.");
        }

        const userDto = new UserDto(user);
        const { id } = userDto;

        const tokens = tokenService.generateTokens({ id });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFroMdB = await User.findToken({
            where: {refreshToken}
        });

        if (!userData || !tokenFroMdB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

export default new AuthService();
