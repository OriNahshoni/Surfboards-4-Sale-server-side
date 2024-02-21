import { Card } from "../database/model/card";
import { ICardInput } from "./../@types/card.d";
import { Logger } from "../logs/logger";

const createCard = async (data: ICardInput, userId: string) => {
  try {
    const card = new Card(data);

    card.userId = userId;
    while (true) {
      const random = Math.floor(Math.random() * 1_000_000);
      const dbRes = await Card.findOne({ bizNumber: random });
      if (!dbRes) {
        card.bizNumber = random;
        break;
      }
    }

    return card.save();
  } catch (error) {
    Logger.error("Error creating card", 500, error);
    throw error; 
  }
};

export { createCard };
