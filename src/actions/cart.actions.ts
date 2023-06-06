import { cartAtom } from "../states/cart";
import { useSetRecoilState } from "recoil";
import { BirdhouseInterface, BirdhouseCartItemInterface } from "../interfaces/Birdhouse.interface";

export function useCartActions () {
  const setCart = useSetRecoilState(cartAtom);

  return {
    addItem
  };

  function addItem (item: BirdhouseCartItemInterface) {
    setCart(() => {
      //If there is no cart in localStorage, create one
      if (!localStorage.getItem("cart")) localStorage.setItem("cart", `{ "items": [], "total": 0 }`);
      const cartItems = localStorage.getItem("cart");
      if(!cartItems) return "Unknown Error with Local Storage";
      const parsedCartItems: { items: BirdhouseCartItemInterface[], total: number } = JSON.parse(cartItems);
      const foundItem = parsedCartItems.items.find((i) => i.birdhouseId === item.birdhouseId);
      // If item doesn't exists in cart, add a new one.
      if (!foundItem) {
        localStorage.setItem("cart", JSON.stringify({
          items: parsedCartItems.items.concat(item),
          total: parsedCartItems.total + item.quantity
        }));
        return {
          items: [...parsedCartItems.items, item],
          total: parsedCartItems.total + item.quantity
        };
      }
      // if item quantity surpasses stock, don't add it
      if (foundItem.quantity + item.quantity > item.stock) return;
      // if it exists, increase the quantity of it.
      const newStateItems = parsedCartItems.items.map((i: BirdhouseCartItemInterface) => {
        if (i.birdhouseId === item.birdhouseId) {
          return {
            ...i,
            quantity: i.quantity + item.quantity
          };
        }
        return {...i};
      });
      
      localStorage.setItem("cart", JSON.stringify({
        items: newStateItems,
        total: parsedCartItems.total + item.quantity
      }));
      return {
        items: newStateItems,
        total: parsedCartItems.total + item.quantity
      };
    });
  }
}
