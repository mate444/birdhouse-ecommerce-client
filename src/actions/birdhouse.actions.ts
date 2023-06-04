import { useSetRecoilState } from "recoil";
import { useFetch } from "../hooks/useFetch";
import { birdhousesAtom } from "../states/birdhouse";

export function useBirdhouseActions () {
  const baseUrl = `${import.meta.env.VITE_API_URL}/birdhouse`;
  const birdhouseFetch = useFetch();
  const setBirdhouses = useSetRecoilState(birdhousesAtom);

  return {
    getAll
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

}
