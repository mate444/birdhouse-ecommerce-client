import { isStrongPassword, isEmail } from "../../utils/validations";

export interface ILogin {
  email: string;
  password: string;
}

export const loginValidations = {
  email: {
    isEmail: (value: string) => isEmail(value) || "Email is incorrect"
  },
  password: {
    isStrongPassword: (value: string) => isStrongPassword(value) || "Password is incorrect"
  }
};