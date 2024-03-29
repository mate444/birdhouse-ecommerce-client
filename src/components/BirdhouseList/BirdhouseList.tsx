import { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import BirdhouseCard from "../BirdhouseCard/BirdhouseCard";
import { BirdhouseInterface } from "../../interfaces/Birdhouse.interface";

interface BirdhouseListProps {
  birdhouses: BirdhouseInterface[]
}

const BirdhouseList: FC<BirdhouseListProps> = (props) => {
  return (
    <SimpleGrid
      w={"100%"}
      paddingY={"10px"}
      alignSelf={"center"}
      columns={[1, 2, 2, 3]}
      spacing={"1px"}
      templateRows={["1fr"]}>
      { props.birdhouses.map((b) => (
        <BirdhouseCard
          key={b.birdhouseId}
          price={b.price}
          name={b.name}
          stock={b.stock}
          picture={b.pictures[0]?.picture}
          id={b.birdhouseId}
          socialMedia={b.socialMedia}
        />
      )) }
    </SimpleGrid>
  );
};

export default BirdhouseList;
