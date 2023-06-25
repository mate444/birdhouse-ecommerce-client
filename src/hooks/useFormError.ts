// TODO: Add typings to function parameters to secure abstraction
//                  Object to be validated    Validation functions to be executed
export function useFormError (body: any , validations: any ) {
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