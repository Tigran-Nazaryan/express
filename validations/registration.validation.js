import Joi from 'joi';

export const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
});