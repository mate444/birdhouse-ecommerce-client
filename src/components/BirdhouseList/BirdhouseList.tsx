import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import BirdhouseCard from "../BirdhouseCard/BirdhouseCard";
import { BirdhouseInterface } from "../../interfaces/Birdhouse.interface";

interface BirdhouseListProps {
  birdhouses: BirdhouseInterface[]
}

const BirdhouseList: FC<BirdhouseListProps> = (props) => {
  return (
    <Box>
      { props.birdhouses.map((b) => (
        <BirdhouseCard
          key={b.birdhouseId}
          price={b.price}
          name={b.name}
          size={b.size}
          picture={b.pictures[0]?.picture}
          id={b.birdhouseId}
        />
      )) }
    </Box>
  );
};

export default BirdhouseList;
