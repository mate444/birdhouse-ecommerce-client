import { atom } from "recoil";
import { BirdhouseInterface } from "../interfaces/Birdhouse.interface";
import { RecoilState } from "recoil";

export interface IBirdhouseAtom {
  birdhouses: BirdhouseInterface[] | []
  totalPages: number;
  birdhouseSearch: string;
  birdhouseSort: string;
}

// Recoil Atom type gets contradicted when using any of the hooks, so had to give it type any in order to
// be able to access the updated state properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const birdhousesAtom: RecoilState<any> = atom({
  key: "birdhouses",
  default: {
    birdhouses: [],
    birdhouseSearch: "",
    totalPages: 1,
    birdhouseSort: ""
  }
});

// Recoil Atom type gets contradicted when using any of the hooks, so had to give it type any in order to
// be able to access the updated state properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const birdhouseDetailAtom: RecoilState<any> = atom({
  key: "birdhouse_detail",
  default: null
});