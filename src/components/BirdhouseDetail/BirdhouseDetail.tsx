import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { birdhouseDetailAtom } from "../../states/birdhouse";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { BirdhouseInterface } from "../../interfaces/Birdhouse.interface";
// import { useCartActions } from "../../actions/cart.actions";
import { Link as ReactLink } from "react-router-dom";
import Carrousel from "../Carrousel/Carrousel";
import { 
  Box,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Flex,
  CircularProgress,
  IconButton
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { getSocialMediaIcon } from "../../utils/getIcon";

const BirdhouseDetail: FC = () => {
  // const [cartQuantity, setCartQuantity] = useState(1);
  // const { addItem } = useCartActions();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);
  const { getById, cleanBirdhouseDetail } = useBirdhouseActions();
  const { id } = useParams();
  const navigate = useNavigate();
  const birdhouseDetail: BirdhouseInterface = useRecoilValue(birdhouseDetailAtom);

  // const increaseCartQuantity = (cartQuantity: number) => {
  //   if (cartQuantity < birdhouseDetail.stock) setCartQuantity(cartQuantity + 1);
  // };

  // const decreaseCartQuantity = (cartQuantity: number) => {
  //   if (cartQuantity > 1) setCartQuantity(cartQuantity - 1);
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1023);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    getById(id);
    return () => {
      cleanBirdhouseDetail();
    };
  }, []);
  return (
    <Grid
      my={["0", null, null, "5vh"]}
      mx={["0", null, null, "5vw"]}
      bg={"white"}
      templateColumns={["1fr", null, null, "1fr 0.5fr"]}
      templateRows={["1fr repeat(4, auto)", null, null, "repeat(3, auto)"]}>
      { birdhouseDetail ?
        <>
          <GridItem
            border={isDesktop ? "1px" : undefined}
            rowStart={1}
            rowEnd={[1, null, null, 3]}
            colStart={1}
            colEnd={1}>
            <Carrousel isDesktop={isDesktop} pictures={birdhouseDetail.pictures}/>
          </GridItem>
          <GridItem
            borderY={isDesktop ? "1px" : undefined}
            borderRight={isDesktop ? "1px" : undefined}
            display={"flex"}
            flexDir={"column"}
            rowStart={[2, null, null, 1]}
            rowEnd={[2, null, null, 1]}
            colStart={[1, null, null, 2]}
            colEnd={[1, null, null, 2]}
            p={"20px"}>
            <Box alignSelf={"flex-start"} pb={"10px"} mb={"5px"} borderBottom={"1px"}>
              <Heading size={"xl"}>
                {birdhouseDetail.name}
              </Heading>
              {/* <Text>
                {birdhouseDetail.price} €
              </Text> */}
            </Box>
            {/* <Box>
              {/* <Button onClick={() => decreaseCartQuantity(cartQuantity)}>-</Button> */}
            {/* <Text>{cartQuantity}</Text> */}
            {/* <Button onClick={() => increaseCartQuantity(cartQuantity)}>+</Button> */}
            {/* <Text>(Limit {birdhouseDetail.stock})</Text> */}
            {/* </Box> */}
            <Flex gap={5} mt={"10px"}>
              { birdhouseDetail.socialMedia.map((s) => {
                const Icon = getSocialMediaIcon(s.name);
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
              // onClick={() => addItem({
              //   birdhouseId: birdhouseDetail.birdhouseId,
              //   name: birdhouseDetail.name,
              //   price: birdhouseDetail.price,
              //   picture: "birdhouseDetail.pictures[0].picture",
              //   stock: birdhouseDetail.stock,
              //   quantity: cartQuantity
              // })}
              >
                Add to cart
              </Button> */}
            </Flex>
          </GridItem>
          <GridItem
            rowStart={[3, null, null, 2]}
            rowEnd={[3, null, null, 3]}
            colStart={[1, null, null, 2]}
            colEnd={[1, null, null, 2]}>
            <Heading textAlign={"center"} borderRight={isDesktop ? "1px" : undefined}> Styles </Heading>
            <Grid
              p={"5px"}
              templateRows={["1fr 1fr"]}
              templateColumns={["1fr 1fr"]}
              borderBottom={isDesktop ? "1px" : undefined}
              borderRight={isDesktop ? "1px" : undefined}
              gap={"10px"}>
              { birdhouseDetail.styles.map((s) => (
                <GridItem
                  borderRadius={10}
                  p={"5px"}
                  bgColor={"#1B9706"}
                  w={["40vw", "30vw", "30vw", "10vw"  ]}
                  justifySelf={"center"}
                  key={s.id}>
                  <Heading
                    size={"md"}
                    textAlign={"center"}
                    fontWeight={"medium"}
                    color={"white"}>
                    {s.style}
                  </Heading>
                </GridItem>
              )) }
            </Grid>
           
          </GridItem>
          {/* <GridItem
            rowStart={3}
            rowEnd={3}
            colStart={2}
            colEnd={2}>

            
          </GridItem> */}
          <GridItem
            mt={!isDesktop ? "5px" : 0}
            borderX={isDesktop ? "1px" : 0}
            borderBottom={isDesktop ? "1px" : 0}
            // borderTop={"1px"}
            borderColor={"rgba(0,0,0,.5)"}
            rowStart={[4, null, null, 3]}
            rowEnd={[4, null, null, 3]}
            colStart={[1]}
            colEnd={[1]}>
            <Text p="20px" textAlign={"left"} fontWeight={"semibold"}>{birdhouseDetail.description}</Text>
          </GridItem>
        </>
        :
        <CircularProgress isIndeterminate/>}
    </Grid>
  );
};

export default BirdhouseDetail;

