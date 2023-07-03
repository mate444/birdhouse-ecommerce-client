import { FC, useEffect } from "react";
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
  const birdhouseState = useRecoilValue(birdhousesAtom);
  const [queryParams] = useSearchParams();
  let page = queryParams.get("page");
  useEffect(() => {
    if (page === null) page = "1";
    getAll(page, birdhouseState.birdhouseSearch, birdhouseState.birdhouseSort)
      .then(() => {
        window.scrollTo(0, 0);
      });
  }, [page, birdhouseState.birdhouseSort]);
  return (
    <Flex marginX={[0, 0, "10vw"]} flexDirection={"column"}>
      <Heading mt="1em" alignSelf={"center"}> Birdhouses showcase </Heading>
      { birdhouseState.birdhouses?.length > 0 ?
        <>
          <Box mt="1em" w={["100%", "50%", null, "33%", "25%"]} alignSelf={"flex-end"}>
            <SortSelect setSort={setSort} route={`/?page=1`}/>
          </Box>
          <BirdhouseList birdhouses={birdhouseState.birdhouses}/>
          <Box alignSelf={"center"}>
            <Pagination route="/" totalPages={parseInt(birdhouseState.totalPages)} sort={birdhouseState.birdhouseSort} currentPage={parseInt(page || "1")}/>
          </Box>
        </> : <CircularProgress alignSelf={"center"} isIndeterminate/>}
    </Flex>
  );
};

export default Home;
