import { cartAtom } from "../states/cart";
import { useSetRecoilState } from "recoil";
import { BirdhouseCartItemInterface } from "../interfaces/Birdhouse.interface";

export function useCartActions () {
  const setCart = useSetRecoilState(cartAtom);

  return {
    addItem,
    getCart,
    changeItemQuantity,
    removeItem
  };

  function addItem (item: BirdhouseCartItemInterface) {
    //If there is no cart in localStorage, create one
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", `{ "items": [] }`);
    const cartItems = localStorage.getItem("cart");
    if(!cartItems) return "Unknown Error with Local Storage";
    const parsedCart: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
    const foundItem = parsedCart.items.find((i) => i.birdhouseId === item.birdhouseId);
    // If item doesn't exists in cart, add a new one.
    if (!foundItem) {
      localStorage.setItem("cart", JSON.stringify({
        items: parsedCart.items.concat(item),
      }));
      return setCart({items: [...parsedCart.items, item]});
    }
    // if item quantity surpasses stock, don't add it
    if (foundItem.quantity + item.quantity > item.stock) return `You have ${foundItem.quantity} of ${item.stock} available`;
    // if it exists, increase the quantity of it.
    const newStateItems = parsedCart.items.map((i: BirdhouseCartItemInterface) => {
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
    return setCart({ items: newStateItems });
  }

  function getCart () {
    //Check if cart is in local storage
    if (!localStorage.getItem("cart")) localStorage.setItem("cart", `{ "items": [] }`);
    const cartItems = localStorage.getItem("cart");
    if(!cartItems) return "Unknown Error with Local Storage";
    const parsedCart: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
    setCart({
      items: parsedCart.items,
    });
  }

  function changeItemQuantity (amount: number, birdhouseId: string) {
    setCart((oldState: { items: BirdhouseCartItemInterface[] }) => {
      const cartItems = localStorage.getItem("cart");
      if(!cartItems) return "Unknown Error with Local Storage";
      const parsedCart: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
      const foundItem = parsedCart.items.find((it) => it.birdhouseId === birdhouseId);
      if (foundItem) {
        if (amount > foundItem.stock) return oldState;
        // if it exists, increase the quantity of it.
        foundItem.quantity = amount;
        localStorage.setItem("cart", JSON.stringify({
          items: parsedCart.items,
        }));
        return {
          items: parsedCart.items,
        };
      }
    });
  }

  function removeItem (birdhouseId: string) {
    setCart(() => {
      const cartItems = localStorage.getItem("cart");
      if(!cartItems) return "Unknown Error with Local Storage";
      const parsedCart: { items: BirdhouseCartItemInterface[] } = JSON.parse(cartItems);
      const filteredCartItems = parsedCart.items.filter((it) => it.birdhouseId !== birdhouseId);
      localStorage.setItem("cart", JSON.stringify({
        items: filteredCartItems
      }));
      return {
        items: filteredCartItems
      };
    });
  }
}
