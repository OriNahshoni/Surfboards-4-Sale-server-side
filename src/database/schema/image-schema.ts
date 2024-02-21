import { Schema } from "mongoose";
import { IImage } from "../../@types/card";

const imageSchema = new Schema<IImage>({
  alt: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  url: {
    type: String,
    minlength: 12,
    maxlength: 1000,
    required: true,
  },
});

export { imageSchema };
