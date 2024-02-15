import Joi from 'joi';

const createPart = Joi.object({
    product_title: Joi.string().required(),
    make: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    condition: Joi.string().valid('used', 'new').required(),
    description: Joi.string(),
    images: Joi.array().items(Joi.string()), // Array of strings for image URLs
});

export default { createPart };
