import { cartAtom } from "../states/cart";
import { useSetRecoilState } from "recoil";
import { BirdhouseCartItemInterface } from "../interfaces/Birdhouse.interface";

export function useCartActions () {
  const setCart = useSetRecoilState(cartAtom);

  return {
    addItem,
    getCart
  };

  function addItem (item: BirdhouseCartItemInterface) {
    setCart((oldState: { items: BirdhouseCartItemInterface[] }) => {
      //If there is no cart in localStorage, create one
      if (!localStorage.getItem("cart")) localStorage.setItem("cart", `{ "items": [] }`);
      const cartItems = localStorage.getItem("cart");
      if(!cartItems) return "Unknown Error with Local Storage";
      const parsedCartItems: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
      const foundItem = parsedCartItems.items.find((i) => i.birdhouseId === item.birdhouseId);
      // If item doesn't exists in cart, add a new one.
      if (!foundItem) {
        localStorage.setItem("cart", JSON.stringify({
          items: parsedCartItems.items.concat(item),
        }));
        return {
          items: [...parsedCartItems.items, item],
        };
      }
      // if item quantity surpasses stock, don't add it
      if (foundItem.quantity + item.quantity > item.stock) return oldState;
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
      }));
      return {
        items: newStateItems,
      };
    });
  }

  function getCart () {
    //Check if cart is in local storage
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", `{ "items": [] }`);
    const cartItems = localStorage.getItem("cart");
    if(!cartItems) return "Unknown Error with Local Storage";
    const parsedCartItems: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
    setCart({
      items: parsedCartItems.items,
    });
  }
}
