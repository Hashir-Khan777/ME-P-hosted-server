import Joi from "joi";

const Review = Joi.object(
    {
        user: Joi.string().required(),
        part: Joi.string().required(),
        rating: Joi.number().required(),
        review: Joi.string().required(),
    }
)

export default { Review };