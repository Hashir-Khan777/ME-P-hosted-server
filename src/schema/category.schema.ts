import Joi from "joi";

const createCategory = Joi.object(
    {
        category_name: Joi.string().required(),
        slug: Joi.string().required(),
        description: Joi.string()

    });

export default { createCategory };