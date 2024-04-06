import Joi from 'joi';

const Store = Joi.object({
    user: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    area: Joi.string().required(),
    postalCode: Joi.string().required(),
    pricingPlan: Joi.string().required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    paymentScreenShot: Joi.string().required(),
    approve: Joi.boolean().required().default(false),
});

export default { Store };
