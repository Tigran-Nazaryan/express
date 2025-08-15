import Joi from "joi";

export const postSchema = Joi.object({
    author: Joi.string().min(1).optional(),
    title: Joi.string().min(3).required(),
    body: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
    userId: Joi.number().integer().required(),
    user: Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    }).required()
});