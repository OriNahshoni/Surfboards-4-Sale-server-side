export type ICardInput = {
  brand: string;
  model: string;
  condition: string;
  size: number;
  liters: number;
  price: number;
  description?: string;
  image?: IImage;
  location: string;
  phone: string;
};

type IImage = {
  alt: string;
  url: string;
};

export type ICard = ICardInput & {
  bizNumber?: number;
  userId?: string;
  _id?: string;
  likes: string[];
  createdAt: Date;
};
