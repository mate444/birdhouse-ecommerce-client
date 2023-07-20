import { FC, useEffect, useState } from "react";
import BirdhouseList from "../BirdhouseList/BirdhouseList";
import Pagination from "../Pagination/Pagination";
import SortSelect from "../SortSelect/SortSelect";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { birdhousesAtom } from "../../states/birdhouse";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Flex, Heading } from "@chakra-ui/react";

const Home: FC = () => {
  const { getAll, setSort } = useBirdhouseActions();
    const [isLoading, setIsLoading] = useState(true);
  const birdhouseState = useRecoilValue(birdhousesAtom);
  const [queryParams] = useSearchParams();
  let page = queryParams.get("page");
  useEffect(() => {
    if (page === null) page = "1";
      getAll(page, birdhouseState.birdhouseSearch, birdhouseState.birdhouseSort)
          .then(() => {
              setIsLoading(false);
              window.scrollTo(0, 0);
          }).catch(() => setIsLoading(false));
  }, [page, birdhouseState.birdhouseSort, birdhouseState.birdhouseSearch]);
  return (
    <Flex marginX={[0, 0, "10vw"]} flexDirection={"column"}>
          {isLoading && <CircularProgress alignSelf={"center"} isIndeterminate />}
      { !isLoading && birdhouseState.birdhouses?.length > 0 ?
        <>
          <Heading mt="1em" alignSelf={"center"}> Birdhouses showcase </Heading>
          <Box mt="1em" w={["100%", "50%", null, "33%", "25%"]} alignSelf={"flex-end"}>
            <SortSelect setSort={setSort} route={`/?page=1`}/>
          </Box>
          <BirdhouseList birdhouses={birdhouseState.birdhouses}/>
          <Box alignSelf={"center"}>
            <Pagination route="/" totalPages={parseInt(birdhouseState.totalPages)} sort={birdhouseState.birdhouseSort} currentPage={parseInt(page || "1")}/>
          </Box>
              </> : <Heading mt="1em" alignSelf={"center"}> There are no birdhouses currently available </Heading>}
    </Flex>
  );
};

export default Home;
