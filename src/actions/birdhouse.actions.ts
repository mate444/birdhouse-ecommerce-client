import { useSetRecoilState } from "recoil";
import { useFetch } from "../hooks/useFetch";
import { birdhousesAtom, birdhouseDetailAtom, IBirdhouseAtom } from "../states/birdhouse";
import { ICreateBirdhouse, IUpdateBirdhouse, BirdhouseStatusEnum } from "../interfaces/Birdhouse.interface";
import { NavigateFunction } from "react-router-dom";
import { UseToastOptions } from "@chakra-ui/react";
import { useError } from "../hooks/useError";

export function useBirdhouseActions (toast?: (args: UseToastOptions) => void, navigate?: NavigateFunction) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/birdhouse`;
  const birdhouseFetch = useFetch();
  const setBirdhouses = useSetRecoilState(birdhousesAtom);
  const setBirdhouseDetail = useSetRecoilState(birdhouseDetailAtom);

  return {
    create,
    getAll,
    getById,
    cleanBirdhouseDetail,
    update,
    remove,
    setSort
  };

  async function getAll (page: string, search: string, sort?: string) {
    try {
      const response = await birdhouseFetch.get(`${baseUrl}?page=${page}&search=${search}&sort=${sort || ""}`);
      setBirdhouses((oldBirdhouseState: IBirdhouseAtom) => {
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
      if (!birdhouse.pictures) throw "Birdhouse pictures are required";
      for (let i = 0; i < birdhouse.pictures.length; i += 1) {
        formData.append("pictures", birdhouse.pictures[i]);
      }
      const formatedStyles = birdhouse.styles.map((b: { name: string }) => b.name);
      formData.append("name", birdhouse.name);
      formData.append("price", birdhouse.price);
      formData.append("size", birdhouse.size);
      formatedStyles.forEach((s) => formData.append("styles[]", s));
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
      if (toast) {
        useError(err, toast);
      }
    }
  }

  async function update (birdhouse: IUpdateBirdhouse) {
    try {
      await birdhouseFetch.patch(`${baseUrl}`, {
        ...birdhouse,
        price: parseInt(birdhouse.price),
        stock: parseInt(birdhouse.stock),
        size: parseInt(birdhouse.size)
      });
      if (toast) {
        toast({
          title: "Birdhouse was updated",
          duration: 5000,
          isClosable: true,
          status: "success"
        });
      }
    } catch (err) {
      console.log(err);
      if (toast) {
        useError(err, toast);
      }
    }
  }

  async function remove (params: { birdhouseId: string, status: BirdhouseStatusEnum }) {
    try {
      await birdhouseFetch.delete(`${baseUrl}?birdhouseId=${params.birdhouseId}&status=${params.status}`);
      if (toast) {
        toast({
          title: `Birdhouse succesfully ${params.status === BirdhouseStatusEnum.inactive ? "disabled" : "restored"}`,
          duration: 5000,
          isClosable: true,
          status: "success"
        });
      }
    } catch (err) {
      if (toast) {
        useError(err, toast);
      }
    }
  }

  function cleanBirdhouseDetail () {
    setBirdhouseDetail(null);
  }

  function setSort (sort: string) {
    setBirdhouses((oldState: IBirdhouseAtom) => {
      return {
        ...oldState,
        birdhouseSort: sort
      };
    });
  }
}
