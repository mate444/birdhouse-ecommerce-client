import { 
  isInt,
  maxLength,
  minLength,
} from "../../utils/validations";
interface IBirdhouseStyle {
    name: string;
}

export interface IBirdhouseValidation {
  name: string;
  stock: string;
  price: string;
  description: string;
  size: string;
  pictures: FileList;
  styles: IBirdhouseStyle[]
}


export const birdhouseValidations = {
  name: {
    minLength: (value: string) => minLength(value, 1) || "Birdhouse name is too short",
    maxLength: (value: string) => maxLength(value, 30) || "Birdhouse name is too long"
  },
  price: {
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse price must be a number"
  },
  stock: {
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse stock must be a number"
  },
  size: {
    isInt: (v: string) => isInt(v, { allow_leading_zeroes: false }) || "Birdhouse size must be a number"
  },
  description: {
    minLength: (value: string) => minLength(value, 1) || "Birdhouse description is too short",
    maxLength: (value: string) => maxLength(value, 30) || "Birdhouse description is too long"
  },
  styles: {
    minLength: (value: string) => minLength(value, 1) || "Birdhouse style is too short",
    maxLength: (value: string) => maxLength(value, 45) || "Birdhouse style is too long",
  }
};
