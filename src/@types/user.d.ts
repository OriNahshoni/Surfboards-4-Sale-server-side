import { ObjectId } from "mongoose";

type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

type IUser = {
  name: IName;
  address: IAddress;
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};

type ILogin = {
  email: string;
  password: string;
};


type IJWTPayload = {
  email: string;
  isAdmin:boolean;
  isBusiness:boolean;
};

export { IUser, IName, IAddress, ILogin, IJWTPayload };
