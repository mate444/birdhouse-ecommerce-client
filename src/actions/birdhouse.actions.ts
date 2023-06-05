import { useSetRecoilState } from "recoil";
import { useFetch } from "../hooks/useFetch";
import { birdhousesAtom, birdhouseDetailAtom } from "../states/birdhouse";

export function useBirdhouseActions () {
  const baseUrl = `${import.meta.env.VITE_API_URL}/birdhouse`;
  const birdhouseFetch = useFetch();
  const setBirdhouses = useSetRecoilState(birdhousesAtom);
  const setBirdhouseDetail = useSetRecoilState(birdhouseDetailAtom);

  return {
    getAll,
    getById
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

}
