import { atom } from "recoil";
import { BirdhouseInterface } from "../interfaces/Birdhouse.interface";
import { RecoilState } from "recoil";

export const birdhousesAtom = atom({
  key: "birdhouses",
  default: {
    birdhouses: [],
    totalPages: null,
    birdhouseSearch: ""
  }
});

// Recoil Atom type gets contradicted when using any hook, so had to give it type any in order to
// be able to access the updated state properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const birdhouseDetailAtom: RecoilState<any> = atom({
  key: "birdhouse_detail",
  default: null
});