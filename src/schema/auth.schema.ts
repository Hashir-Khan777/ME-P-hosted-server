import Joi from 'joi';

const Auth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export default { Auth };
