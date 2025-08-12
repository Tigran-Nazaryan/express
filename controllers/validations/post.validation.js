import Joi from "joi";

export const postSchema = Joi.object({
    author: Joi.string().min(1).optional(),
    title: Joi.string().min(3).required(),
    body: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
    userId: Joi.number().integer().required(),
});