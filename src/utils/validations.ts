import validator from "validator";

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

export {
  isArray,
  isInt,
  isNotEmpty,
  maxLength,
  maxSizeArray,
  minLength,
  isString
};