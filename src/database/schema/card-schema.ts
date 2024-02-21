import { ICard } from "../../@types/card";
import { Schema } from "mongoose";
import { imageSchema } from "./image-schema";

const cardSchema = new Schema<ICard>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  condition: { type: String, required: true },
  size: { type: Number, required: true },
  liters: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: imageSchema },
  location:{type: String, required: true},
  phone:{type: String, required: true},
  userId: { type: String, required: true },
  bizNumber: {
    type: Number,
    required: false,
    // we will fill this field in the card-service
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  likes: [
    {
      type: String,
    },
  ],
});

export { cardSchema };
