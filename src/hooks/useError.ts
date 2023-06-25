import { UseToastOptions } from "@chakra-ui/react";
import { AxiosError } from "axios";

export const useError = (error: unknown, toast: (arg: UseToastOptions) => void) => {
  // const [errorState, setErrorState] = useState(error);

  if (error instanceof AxiosError) {
    const formattedError = formatRequestError(error);
    toast({
      title: formattedError,
      duration: 5000,
      isClosable: true,
      status: "error"
    });
  }
  else if (typeof error === "string") toast({
    title: error,
    duration: 5000,
    isClosable: true,
    status: "error"
  });

  function formatRequestError (error: AxiosError): string {
    switch (error.response?.status) {
    case 500:
      return "There was a problem with the requested service";
    
    case 401:
      return "Log in to check if you have access to this service";

    case 403:
      return "You do not have the permissions for accessing this service";
    
    case 404:
      return "We couldn't find what you were looking for";

    default:
      return `${error.response?.data}`;
    }
  }
};
