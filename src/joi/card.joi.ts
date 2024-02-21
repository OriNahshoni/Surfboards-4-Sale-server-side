import Joi from "joi";
import { ICard } from "../@types/card";
import { IImage } from "../@types/card";
import { phoneRegex } from "./patterns";

const schema = Joi.object<ICard>({
  brand: Joi.string().min(1).max(100).required(),
  model: Joi.string().min(1).max(100).required(),
  condition: Joi.string().min(1).max(100).required(),
  size: Joi.number().min(1).max(999).required(),
  liters: Joi.number().min(1).max(999).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(1).max(500).required(),
  image: Joi.object<IImage>({
    url: Joi.string().uri().min(5).max(100000).required(),
    alt: Joi.string().min(1).max(100).required(),
  }),
  location: Joi.string().min(1).max(500).required(),
  phone: Joi.string().pattern(phoneRegex).min(1).max(50).required(),
}).required();

export default schema;
export { schema as joiCardSchema };
