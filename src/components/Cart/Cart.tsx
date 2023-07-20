import React, { FC, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  useToast
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useCartActions } from "../../actions/cart.actions";
import { cartAtom, cartTotalPriceSelector, cartTotalItemsSelector } from "../../states/cart";
import { userAtom } from "../../states/user";
import { useNavigate } from "react-router-dom";
import { BirdhouseCartItemInterface } from "../../interfaces/Birdhouse.interface";
import CartItem from "../CartItem/CartItem";

const Cart: FC = () => {
  const cart = useRecoilValue(cartAtom);
  const cartTotalPrice = useRecoilValue(cartTotalPriceSelector);
  const cartTotalItems = useRecoilValue(cartTotalItemsSelector);
  const userData = useRecoilValue(userAtom);
  const toast = useToast();
  const navigate = useNavigate();

  const { getCart, goToCheckout } = useCartActions(toast, navigate);
  useEffect(() => {
    getCart();
  }, []);
  const handleClick = () => {
    goToCheckout({
      birdhouses: cart.items.map((i: BirdhouseCartItemInterface) => {
        return {
          birdhouseId: i.birdhouseId,
          amount: i.quantity
        };
      }),
      price: cartTotalPrice,
      userId: userData.id
    }).then(() => "Sent");
  };
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
            <CartItem
              birdhouseId={it.birdhouseId}
              name={it.name}
              picture={it.picture}
              price={it.price}
              stock={it.stock}
              quantity={it.quantity}
            />
          </Box>
        )) : <Heading>No items in cart</Heading> }
      </Box>
      <Box>
        <Heading>Order Detail</Heading>
        <Heading>Total price</Heading>
        <Heading>{cartTotalPrice}€</Heading>
        <Button onClick={handleClick}>Go to checkout</Button>
      </Box>
    </Box>
  );
};

export default Cart;
