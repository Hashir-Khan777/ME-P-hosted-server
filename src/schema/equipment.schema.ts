import Joi from 'joi';

const createEquipment = Joi.object({
    equipment_name: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
    make: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    sku: Joi.string().required(),
    condition: Joi.string().valid('used', 'new').required(),
    price: Joi.number().required(),
    images: Joi.array().items(Joi.string()),
});

export default { createEquipment };
