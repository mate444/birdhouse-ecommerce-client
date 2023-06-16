import { IUpdateBirdhouse } from "../../interfaces/Birdhouse.interface";
import { 
  isInt,
  maxLength,
  minLength,
  required,
} from "../../utils/validations";

export interface BirdhouseCellError {
  [key: string]: string;
}

export const birdhouseValidations = {
  name: {
    required: (value: unknown) => required(value) || "Birdhouse name is required",
    minLength: (value: string) => minLength(value, 1) || "Birdhouse name is too short",
    maxLength: (value: string) => maxLength(value, 30) || "Birdhouse name is too long"
  },
  price: {
    required: (value: unknown) => required(value) || "Birdhouse price is required",
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse price must be a number"
  },
  stock: {
    required: (value: unknown) => required(value) || "Birdhouse stock is required",
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse stock must be a number"
  },
  size: {
    required: (value: unknown) => required(value) || "Birdhouse size is required",
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse size must be a number"
  },
  description: {
    required: (value: unknown) => required(value) || "Birdhouse description is required",
    minLength: (value: string) => minLength(value, 1) || "Birdhouse description is too short",
    maxLength: (value: string) => maxLength(value, 255) || "Birdhouse description is too long"
  },
  styles: {
    required: (value: unknown) => required(value) || "Birdhouse styles are required",
    minLength: (value: string) => minLength(value, 1) || "Birdhouse style is too short",
    maxLength: (value: string) => maxLength(value, 45) || "Birdhouse style is too long",
  }
};

type IBirdhouseValidations = typeof birdhouseValidations;

export function validateBirdhouse (body: any , validations: any ) {
  const errors: any = {};
  if (!(validations instanceof Object)) throw new Error("Validations must be an object");
  if (!(body instanceof Object)) throw new Error("Body must be an object");
  for (const property in body) {
    if (validations[property] === undefined) continue;
    for (const validation of Object.values(validations[property])) {
      if (typeof validation !== "function") throw new Error("Validation keys must be a function");
      if (Array.isArray(body[property])) {
        body[property].forEach((propertyValue: any, i: number) => {
          const validationResult = validation(propertyValue);
          if (typeof validationResult === "string") {
            errors[property] = { [i]: validationResult };
          }
        });
        continue;
      } 
      const validationResult = validation(body[property]);
      if (typeof validationResult === "string") {
        errors[property] = validationResult;
      }
    }
  }
  return errors;
}