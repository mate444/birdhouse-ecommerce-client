import { isEmail, isStrongPassword, isCountry } from "../../utils/validations";

export interface IRegister {
  email: string;
  country: string;
  password: string;
}

export const registerValidations = {
  email: {
    isEmail: (value: string) => isEmail(value) || "Email is incorrect"
  },
  password: {
    isStrongPassword: (value: string) => isStrongPassword(value) || "Password is incorrect"
  },
  country: {
    isCountry: (value: string) => isCountry(value) || "Country is incorrect"
  }
};
