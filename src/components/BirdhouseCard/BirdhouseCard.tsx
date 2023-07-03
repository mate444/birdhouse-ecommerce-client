import { FC } from "react";
import defaultBirdhousePicture from "../../assets/default_birdhouse.jpg";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Stack,
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
    <Card w={["100%", "100%", "100%", "30vw", "20vw"]} border={"1px"} borderColor={"#989898"} size={"sm"} bg="white">
      <CardBody p="0">
        <Link to={`/birdhouse/${props.id}`}>
          <Image
            src={props.picture}
            borderRadius={2}
            fallbackSrc={defaultBirdhousePicture}
            alt={"birdhouse_image"}
            w={"100%"}
            h={["40vh", "35vh", null, null, "40vh"]}
          />
        </Link>
        <Stack mx="1vw" mt='6'>
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
        })}
        bgColor="#1B9706"
        color="white"
        fontWeight={"light"}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BirdhouseCard;
