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
  IconButton,
  Icon,
  Flex,
  Link
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { getSocialMediaIcon } from "../../utils/getIcon";

interface BirdhouseCardProps {
  price: number;
  name: string;
  id: string;
  picture: string;
  stock: number;
  socialMedia: { name: string, link: string }[]
}

const BirdhouseCard: FC<BirdhouseCardProps> = (props) => {
  return (
    <Card w={"100%"} border={"1px"} borderColor={"#989898"} size={"sm"} bg="white">
      <CardBody>
        <Link as={ReactLink} to={`/birdhouse/${props.id}`}>
          <Image
            src={props.picture}
            borderRadius={2}
            fallbackSrc={defaultBirdhousePicture}
            alt={"birdhouse_image"}
            w={"100%"}
            objectFit={"contain"}
            h={["40vh", "35vh", null, null, "40vh"]}
          />
        </Link>
        <Stack mt='6'>
          <Link as={ReactLink} to={`/birdhouse/${props.id}`}>
            <Heading size='md'>{props.name}</Heading>
          </Link>
          {/* <Text color='1B9706' fontSize='2xl'>
            {props.price}€
          </Text> */}
        </Stack>
      </CardBody>
      <CardFooter gap={2}>
        { props.socialMedia.map((s) => {
          const Icon = getSocialMediaIcon(s.name);
          // <Flex
          //   py={"5px"}
          //   px={"10px"}
          //   key={s.link}
          //   bgColor={"#1B9706"}
          //   borderRadius={10}
          //   textAlign={"center"}
          //   fontSize={"1.5vw"}>
          //   <Link alignSelf={"center"} as={ReactLink} to={s.link}>
          //     <Icon color={"white"} as={getSocialMediaIcon(s.name)}/>
          //   </Link>
          // </Flex>
          return <IconButton 
            key={s.link}
            aria-label={"go-to-social-page"}
            bgColor={"#1B9706"}
            borderRadius={10}
            icon={<Icon />}
            color={"white"}
            fontSize={["8vw", "4vw", null, "3vw", "1.5vw"]}
            size={"lg"}
            as={ReactLink}
            to={s.link}
            target={"_blank"}
          />;
        }) }
        {/* <Button
          bgColor="#1B9706"
          color="white"
          fontWeight={"light"}>
          Add to cart
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default BirdhouseCard;
