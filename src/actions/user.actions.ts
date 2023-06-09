import { useSetRecoilState } from "recoil";
import { userAtom } from "../states/user";
import { useFetch } from "../hooks/useFetch";
import { useError } from "../hooks/useError";
import { IUserLogin, IUserRegister } from "../interfaces/User.interface";
import { NavigateFunction } from "react-router-dom";
import { UseToastOptions } from "@chakra-ui/react";

export function useUserActions (toast: (args: UseToastOptions) => void, navigate: NavigateFunction) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/user`;
  const userFetch = useFetch();
  const setUser = useSetRecoilState(userAtom);
  return {
    register,
    login
  };
  
  async function register (data: IUserRegister) {
    try {
      const response = await userFetch.post(`${baseUrl}/register`, data);
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      toast({
        title: "Account created!",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      navigate("/");
    } catch (err) {
      useError(err, toast);
    }
  }

  async function login (data: IUserLogin) {
    try {
      const response = await userFetch.post(`${baseUrl}/login`, data);
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      navigate("/");
    } catch (err) {
      useError(err, toast);
    }
  }
}
