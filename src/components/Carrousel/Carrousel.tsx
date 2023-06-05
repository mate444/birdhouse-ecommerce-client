import React, { useState, FC } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import defaultBirdhousePicture from "../../assets/default_birdhouse.jpg";

const Carrousel: FC<{ pictures: { id: number, picture: string }[] }> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? props.pictures.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastIndex = currentIndex === props.pictures.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSelected = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <Box>
      <Box>
        <Button onClick={goToPrevious}>
          ❰
        </Button>
        <Button onClick={goToNext}>
          ❱
        </Button>
        <Box>
          <Image
            src={props.pictures[currentIndex].picture}
            fallbackSrc={defaultBirdhousePicture}
          />
        </Box>
      </Box>
      <Box>
        {/* Positioning will be improved when styling gets added */}
        <Box display="flex" justifyContent="center" overflowX={"scroll"} overflowY={"hidden"} whiteSpace={"nowrap"} width="200px">
          { props.pictures.map((p, i) => (
            <Image key={p.id} width="100px" src={p.picture} fallbackSrc={defaultBirdhousePicture} onClick={() => goToSelected(i)}/>
          )) }
        </Box>
      </Box>
    </Box>
  );
};

export default Carrousel;
