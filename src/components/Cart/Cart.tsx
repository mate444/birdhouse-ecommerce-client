import React, { FC, useEffect } from "react";
import {
  Box,
  Heading,
  Button
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useCartActions } from "../../actions/cart.actions";
import { cartAtom, cartTotalPriceSelector, cartTotalItemsSelector } from "../../states/cart";
import { BirdhouseCartItemInterface } from "../../interfaces/Birdhouse.interface";

const Cart: FC = () => {
  const cart = useRecoilValue(cartAtom);
  const cartTotalPrice = useRecoilValue(cartTotalPriceSelector);
  const cartTotalItems = useRecoilValue(cartTotalItemsSelector);

  const { getCart } = useCartActions();
  useEffect(() => {
    getCart();
  }, []);
  return (
    <Box>
      Cart Component
      <Box>
        <Heading>
          Items in cart: {cartTotalItems}
        </Heading>
      </Box>
      <Box>
        { cart.items.length > 0 ? cart.items.map((it: BirdhouseCartItemInterface) => (
          <Box key={it.birdhouseId}>
          </Box>
        )) : <Heading>No items in cart</Heading> }
      </Box>
      <Box>
        <Heading>Order Detail</Heading>
        <Heading>Total price</Heading>
        <Heading>{cartTotalPrice}€</Heading>
        <Button>Go to checkout</Button>
      </Box>
    </Box>
  );
};

export default Cart;
