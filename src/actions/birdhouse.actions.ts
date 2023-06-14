import { useSetRecoilState } from "recoil";
import { useFetch } from "../hooks/useFetch";
import { birdhousesAtom, birdhouseDetailAtom } from "../states/birdhouse";
import { ICreateBirdhouse } from "../interfaces/Birdhouse.interface";
import { NavigateFunction } from "react-router-dom";
import { UseToastOptions } from "@chakra-ui/react";
import { useError } from "../hooks/useError";
import { setFormatData } from "../utils/setFormatData";

export function useBirdhouseActions (toast?: (args: UseToastOptions) => void, navigate?: NavigateFunction) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/birdhouse`;
  const birdhouseFetch = useFetch();
  const setBirdhouses = useSetRecoilState(birdhousesAtom);
  const setBirdhouseDetail = useSetRecoilState(birdhouseDetailAtom);

  return {
    create,
    getAll,
    getById,
    cleanBirdhouseDetail
  };

  async function getAll (page: string, search: string, sort?: string) {
    try {
      const response = await birdhouseFetch.get(`${baseUrl}?page=${page}&search=${search}&sort=${sort || ""}`);
      setBirdhouses((oldBirdhouseState) => {
        return {
          ...oldBirdhouseState,
          birdhouses: response.data,
          totalPages: response.totalPages
        };
      });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async function getById (id: string) {
    try {
      const response = await birdhouseFetch.get(`${baseUrl}/${id}`);
      setBirdhouseDetail(() => {
        return response;
      });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async function create (birdhouse: ICreateBirdhouse) {
    try {
      const formData = new FormData();
      for (let i = 0; i < birdhouse.pictures.length; i += 1) {
        formData.append("pictures", birdhouse.pictures[i]);
      }
      const formatedStyles = birdhouse.styles.map((b: { name: string }) => b.name);
      formData.append("name", birdhouse.name);
      formData.append("price", birdhouse.price);
      formData.append("size", birdhouse.size);
      formData.append("styles[]", JSON.stringify(formatedStyles));
      formData.append("description", String(birdhouse.description));
      formData.append("stock", birdhouse.stock);
      await birdhouseFetch.post(`${baseUrl}`, formData);
      if (toast) {
        toast({
          title: "Birdhouse created!",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (err) {
      console.log(err);
      if (toast) {
        useError(err, toast);
      }
    }
  }

  function cleanBirdhouseDetail () {
    setBirdhouseDetail(null);
  }
}
