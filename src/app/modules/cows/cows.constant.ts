import { BreedOfCow, CowLabel, LocationOfCow } from "./cows.interface";

export const locationOfCow: LocationOfCow[] = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
];

export const breedOfCow: BreedOfCow[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const cowLabel: CowLabel[] = ["for sale", "sold out"];

export const cowSearchableFields = [
  "name",
  // "age",
  // "price",
  "location",
  "breed",
  // "weight",
  "label",
];

export const cowFilterableFields = [
  "searchTerm",
  "name",
  "age",
  "price",
  "location",
  "breed",
  "weight",
  "label",
];
