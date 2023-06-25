import { atom, RecoilState, selector } from "recoil";
import { BirdhouseCartItemInterface } from "../interfaces/Birdhouse.interface";

export const cartAtom: RecoilState<any> = atom({
  key: "cart",
  default: JSON.parse(localStorage.getItem("cart") || `{ "items": [] }`),
});

export const cartTotalPriceSelector = selector({
  key: "cartTotalPrice",
  get: ({get}) => {
    const cart = get(cartAtom);
    let acc = 0;
    if (!cart) return acc;
    cart.items.forEach((i: BirdhouseCartItemInterface) => {
      acc += (i.price * i.quantity);
    });
    return acc;
  }
});

export const cartTotalItemsSelector = selector({
  key: "cartTotalItems",
  get: ({get}) => {
    const cart = get(cartAtom);
    let acc = 0;
    if (!cart) return acc;
    cart.items.forEach((i: BirdhouseCartItemInterface) => {
      acc += i.quantity;
    });
    return acc;
  }
});
