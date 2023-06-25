import React, { FC } from "react";
import defaultBirdhousePicture from "../../assets/default_birdhouse.jpg";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Stack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCartActions } from "../../actions/cart.actions";

interface BirdhouseCardProps {
  price: number;
  name: string;
  id: string;
  picture: string;
  stock: number;
}

const BirdhouseCard: FC<BirdhouseCardProps> = (props) => {
  const { addItem } = useCartActions();
  return (
    <Box 
      // w={["100vw", "100vw", "30vw", "20vw", "20vw"]}
    >
      <Card bg="white">
        <CardBody>
          <Link to={`/birdhouse/${props.id}`}>
            <Image
              src={props.picture}
              fallbackSrc={defaultBirdhousePicture}
              alt={"birdhouse_image"}
              // borderRadius="base"
              // boxSize={"fit-content"}
            />
          </Link>
          <Stack mt='6' spacing='3'>
            <Link to={`/birdhouse/${props.id}`}>
              <Heading size='md'>{props.name}</Heading>
            </Link>
            <Text color='1B9706' fontSize='2xl'>
              {props.price}€
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button onClick={() => addItem({
            birdhouseId: props.id,
            name: props.name,
            price: props.price,
            picture: props.picture,
            stock: props.stock,
            quantity: 1
          })}>
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default BirdhouseCard;
