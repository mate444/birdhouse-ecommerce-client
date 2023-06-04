import axios from "axios";

enum HttpMethod {
  DELETE = "delete",
  GET = "get",
  PATCH = "patch",
  POST = "put",
  PUT = "put",
}

interface RequestError {
  status: number,
  message: string
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
    return async (url?: string) => {
      try {
        if (typeof url !== "string") throw new TypeError("URL Method must be a string");
        const response = await axios[method](url);
        const { data, status } = response;
        if (status !== 201 && status !== 200) errorRequest({ status, message: data });
        return data;
      } catch (err) {
        console.log(err);
      }
    };
  }
  function errorRequest (error: RequestError) {
    switch (error.status) {
    case 500:
      return "Something went wrong";
    
    case 400:
      return error.message;

    case 401:
      return error.status;

    case 403:
      return error.status;
    
    case 429:
      return {
        error: error.status,
        // Add how much time does to user have to wait
        message: "You have sent too many requests please wait"
      };
    default:
      return "Something went wrong";
    }
  }
};
