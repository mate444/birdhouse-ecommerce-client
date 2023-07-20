import { FC, useState } from "react";
import defaultBirdhousePicture from "../../assets/default_birdhouse.jpg";
import { useCartActions } from "../../actions/cart.actions";
import {
  Box,
  Button,
  Image,
  Heading,
  Text
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface CartItemProps {
  birdhouseId: string;
  name: string;
  picture: string;
  price: number;
  quantity: number;
  stock: number
}

const CartItem: FC<CartItemProps> = (props) => {
  const [itemQuantity, setItemQuantity] = useState(props.quantity);
  const { changeItemQuantity, removeItem } = useCartActions();
  const increaseCartQuantity = (count: number) => {
    if (count < props.stock) {
      changeItemQuantity(count + 1, props.birdhouseId);
      setItemQuantity(count + 1);
    }
  };

  const decreaseCartQuantity = (count: number) => {
    if (count > 1) {
      changeItemQuantity(count - 1, props.birdhouseId);
      setItemQuantity(count - 1);
    }
  };

  const deleteItemFromCart = (birdhouseId: string) => {
    removeItem(birdhouseId);
  };
  return (
    <>
      <Image src={props.picture} fallbackSrc={defaultBirdhousePicture}/>
      <Box>
        <Heading>
          {props.name}
        </Heading>
        <Heading>
          {props.price}€
        </Heading>
      </Box>
      <Box>
        <Button onClick={() => decreaseCartQuantity(itemQuantity)}>-</Button>
        <Text>{itemQuantity}</Text>
        <Button onClick={() => increaseCartQuantity(itemQuantity)}>+</Button>
        <Box>
          <DeleteIcon onClick={() => deleteItemFromCart(props.birdhouseId)}/>
        </Box>
      </Box>
    </>
  );
};

export default CartItem;
