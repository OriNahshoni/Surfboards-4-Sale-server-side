import Joi from "joi";
import { ILogin } from "../@types/user";

const schema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { schema as joiLoginSchema };