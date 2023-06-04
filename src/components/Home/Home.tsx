import React, { FC, useEffect } from "react";
import BirdhouseList from "../BirdhouseList/BirdhouseList";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { birdhousesAtom } from "../../states/birdhouse";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Home: FC = () => {
  const { getAll } = useBirdhouseActions();
  const birdhouseState = useRecoilValue(birdhousesAtom);
  const [queryParams, setQueryParams] = useSearchParams();
  let page = queryParams.get("page");
  useEffect(() => {
    if (page === null) page = "1";
    getAll(page, birdhouseState.birdhouseSearch)
      .then((response) => {
        console.log(response);
      });
  }, []);
  console.log(birdhouseState)
  return (
    <Box>
      Welcome
      { birdhouseState.birdhouses?.length > 0 && <BirdhouseList birdhouses={birdhouseState.birdhouses}/> }
    </Box>
  );
};

export default Home;
