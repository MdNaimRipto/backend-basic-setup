import { Model, Types } from "mongoose";
import { CowPurpose } from "./cows.enum";
import { IUsers } from "../users/users.interface";

export type LocationOfCow =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

export type BreedOfCow =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type CowLabel = "for sale" | "sold out";

export type ICows = {
  name: string;
  age: number;
  price: number;
  location: LocationOfCow;
  breed: BreedOfCow;
  weight: number;
  label: CowLabel;
  category: CowPurpose;
  seller: Types.ObjectId | IUsers;
};

export type CowModel = Model<ICows, object>;

export type ICowFilters = {
  searchTerm?: string;
};
