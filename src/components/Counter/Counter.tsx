import React, { FC } from "react";
import {
  Box,
  Button,
  Text
} from "@chakra-ui/react";

interface CounterProps {
  count: number;
  limit: number;
  setState: (total: number) => void;
}

const Counter: FC<CounterProps> = (props) => {
  const increaseCartQuantity = (count: number) => {
    if (count < props.limit) props.setState(count + 1);
  };

  const decreaseCartQuantity = (count: number) => {
    if (count > 1) props.setState(count - 1);
  };
  return (
    <Box>
      <Button onClick={() => decreaseCartQuantity(props.count)}>-</Button>
      <Text>{props.count}</Text>
      <Button onClick={() => increaseCartQuantity(props.count)}>+</Button>
    </Box>
  );
};

export default Counter;
