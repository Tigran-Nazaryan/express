import Joi from "joi";

export const postSchema = Joi.object({
    author: Joi.string().optional(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
});