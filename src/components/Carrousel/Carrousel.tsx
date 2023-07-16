import { useState, FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Icon, Image, Flex, Grid, GridItem } from "@chakra-ui/react";
import defaultBirdhousePicture from "../../assets/default_birdhouse.jpg";

const Carrousel: FC<{ pictures: { id: number, picture: string }[], isDesktop: boolean }> = (props) => {
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
    <Grid
      gap={2}
      templateRows={["1fr", null, null, "1fr"]}
      templateColumns={["1fr", null, "auto 1fr auto"]}>
      <GridItem
        display={"flex"}
        justifyContent={"center"}
        gridColumnStart={1}
        gridColumnEnd={1}
        gridRowStart={1}
        gridRowEnd={1}>
        <Icon
          alignSelf={"center"}
          backgroundColor={"transparent"}
          fontSize={["10vw", null, null, "5vw"]}
          cursor={"pointer"}
          onClick={goToPrevious}
          as={FaChevronLeft}/>
      </GridItem>
      <GridItem
        display={"flex"}
        justifyContent={"center"}
        gridColumnStart={2}
        gridColumnEnd={2}>
        <Flex
          justifyContent={"center"}>
          <Image
            w={["100%"]}
            h={["50vh", "35vh", null, null, "50vh"]}
            loading={"lazy"}
            objectFit={"contain"}
            src={props.pictures[currentIndex]?.picture}
            fallbackSrc={defaultBirdhousePicture}
          />
        </Flex>
      </GridItem>
      <GridItem
        display={"flex"}
        justifyContent={"center"}
        gridColumnStart={3}
        gridColumnEnd={3}
        gridRowStart={1}
        gridRowEnd={1}>
        <Icon
          alignSelf={"center"}
          backgroundColor={"transparent"}
          onClick={goToNext}
          fontSize={["10vw", null, null, "5vw"]}
          cursor={"pointer"}
          as={FaChevronRight}/>
      </GridItem>
      { props.isDesktop ? <GridItem
        borderTop={"1px"}
        justifySelf={"center"}
        gridRowStart={2}
        gridRowEnd={2}
        gridColumnStart={1}
        colSpan={2}
        gridColumnEnd={4}
        display={"flex"}
        m={"auto"}
        overflowX={"scroll"}
        whiteSpace={"nowrap"}
        bgColor={"#D9D9D9"}
        maxW={"100%"}>
        { props.pictures.map((p, i) => (
          <Image
            key={p.id}
            width={"100%"}
            height={["15vh", null, null, "20vh"]}
            objectFit={"contain"}
            src={p.picture}
            fallbackSrc={defaultBirdhousePicture}
            onClick={() => goToSelected(i)}/>
        )) }
      </GridItem> : null }
    </Grid>
  );
};

export default Carrousel;
