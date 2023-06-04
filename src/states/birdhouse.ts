import { atom } from "recoil";

export const birdhousesAtom = atom({
  key: "birdhouses",
  default: {
    birdhouses: [],
    totalPages: null,
    birdhouseSearch: ""
  }
});
