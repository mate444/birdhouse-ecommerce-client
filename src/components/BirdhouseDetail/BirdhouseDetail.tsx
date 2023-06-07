import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { birdhouseDetailAtom } from "../../states/birdhouse";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { BirdhouseInterface } from "../../interfaces/Birdhouse.interface";
import { useCartActions } from "../../actions/cart.actions";
import Carrousel from "../Carrousel/Carrousel";
import { 
  Box,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

const BirdhouseDetail: FC = () => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const { addItem } = useCartActions();
  const { getById } = useBirdhouseActions();
  const { id } = useParams();
  const navigate = useNavigate();
  const birdhouseDetail: BirdhouseInterface = useRecoilValue(birdhouseDetailAtom);

  const increaseCartQuantity = (cartQuantity: number) => {
    if (cartQuantity < birdhouseDetail.stock) setCartQuantity(cartQuantity + 1);
  };

  const decreaseCartQuantity = (cartQuantity: number) => {
    if (cartQuantity > 1) setCartQuantity(cartQuantity - 1);
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    getById(id);
  }, []);
  console.log(cartQuantity);
  return (
    <Box>
      Birdhouse Detail
      { birdhouseDetail ?
        <Box>
          <Carrousel pictures={birdhouseDetail.pictures}/>
          <Box>
            <Box>
              <Heading>
                {birdhouseDetail.name}
              </Heading>
              <Text>
                {birdhouseDetail.price} €
              </Text>
            </Box>
            <Box>
              <Button onClick={() => decreaseCartQuantity(cartQuantity)}>-</Button>
              <Text>{cartQuantity}</Text>
              <Button onClick={() => increaseCartQuantity(cartQuantity)}>+</Button>
            </Box>
            <Box>
              {/* Add button functionality when cart gets in progress */}
              <Button onClick={() => addItem({
                birdhouseId: birdhouseDetail.birdhouseId,
                name: birdhouseDetail.name,
                price: birdhouseDetail.price,
                picture: birdhouseDetail.pictures[0].picture,
                stock: birdhouseDetail.stock,
                quantity: cartQuantity
              })}>
                Add to cart
              </Button>
            </Box>
          </Box>
          <Box>
            { birdhouseDetail.styles.map((s) => (
              <Box key={s.id}>
                <Text>{s.style}</Text>
              </Box>
            )) }
          </Box>
          <Box>
            <Text>{birdhouseDetail.description}</Text>
          </Box>
        </Box>
        :
        <>Loading</>}
    </Box>
  );
};

export default BirdhouseDetail;
