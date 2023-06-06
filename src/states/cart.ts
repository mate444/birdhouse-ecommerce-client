import { atom, RecoilState } from "recoil";

export const cartAtom: RecoilState<any> = atom({
  key: "cart",
  default: {
    total: 0,
    items: []
  },
});
