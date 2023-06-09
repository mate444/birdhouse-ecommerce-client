import axios from "axios";

enum HttpMethod {
  DELETE = "delete",
  GET = "get",
  PATCH = "patch",
  POST = "post",
  PUT = "put",
}

export const useFetch = () => {
  return {
    delete: request(HttpMethod.DELETE),
    get: request(HttpMethod.GET),
    patch: request(HttpMethod.PATCH),
    post: request(HttpMethod.POST),
    putt: request(HttpMethod.PUT)
  };
  function request (method: HttpMethod) {
    return async (url?: string, body?: any) => {
      if (typeof url !== "string") throw new TypeError("URL Method must be a string");
      const response = await axios[method](url, body);
      const { data } = response;
      return data;
    };
  }
};
