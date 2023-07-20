import validator from "validator";
import { isValid, getAlpha2Code } from "i18n-iso-countries";

function isInt (value: string, opts: validator.IsIntOptions) {
  return validator.isInt(value, opts);
}
function maxLength (value: string, maxlength: number) {
  return value.length <= maxlength;
}

function minLength (value: string, minlength: number) {
  return value.length >= minlength;
}

function isArray (value: unknown) {
  return Array.isArray(value);
}

function maxSizeArray (value: unknown[], size: number) {
  return value.length <= size;
}

function isNotEmpty (value: unknown) {
  return value !== undefined || value !== null;
}

function isString (value: unknown) {
  return typeof value === "string";
}

function required (value: unknown) {
  return typeof value !== "undefined" || value !== null;
}

function isEmail (value: string) {
  return validator.isEmail(value);
}

function isStrongPassword (value: string) {
  return validator.isStrongPassword(value, { minNumbers: 1, minLength: 8, minSymbols: 1 });
}

function isCountry (value: string) {
  return typeof value === "string" && isValid(getAlpha2Code(value, "en"));
}

function isUrl (value: string) {
  return validator.isURL(value);
}

export {
  isArray,
  isInt,
  isNotEmpty,
  maxLength,
  maxSizeArray,
  minLength,
  isString,
  required,
  isEmail,
  isStrongPassword,
  isCountry,
  isUrl
};
