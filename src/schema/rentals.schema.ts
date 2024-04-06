import Joi from 'joi';

const createRental = Joi.object({
    rental_name: Joi.string().required(),
    model: Joi.string().required(),
    pricing_type: Joi.string().valid('monthly', 'weekly', 'daily').required(),
    year: Joi.number().required(),
    make: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    store: Joi.string().required(),
    location: Joi.string().required(),
    sku: Joi.string().required(),
    available_from: Joi.date().required(),
    end_date: Joi.date().required(),
    condition: Joi.string().valid('used', 'new').required(),
    description: Joi.string(),
    reserved: Joi.boolean().default(false),
    images: Joi.array().items(Joi.string()), // Array of strings for image URLs
});

export default { createRental };
