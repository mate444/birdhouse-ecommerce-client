import { FC, useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useToast,
  Link,
  Flex,
  Text
} from "@chakra-ui/react";
import Pagination from "../Pagination/Pagination";
import BirdhouseCell from "../BirdhouseCell/BirdhouseCell";
import SortSelect from "../SortSelect/SortSelect";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { useSearchParams, Link as ReactLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { birdhousesAtom } from "../../states/birdhouse";
import { BirdhouseInterface } from "../../interfaces/Birdhouse.interface";

const columns = [{
  text: "Name",
}, {
  text: "price",
}, {
  text: "stock",
}, {
  text: "size",
}, {
  text: "description",
}, {
  text: "styles",
}, {
  text: "social media",
}];

const BirdhouseTable: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [queryParams] = useSearchParams();
  const toast = useToast();
  const { getAll, update, remove, setSort } = useBirdhouseActions(toast);
  const birdhouseState = useRecoilValue(birdhousesAtom);
  let page = queryParams.get("page");
  useEffect(() => {
    if (page === null) page = "1";
    getAll(page, birdhouseState.birdhouseSearch, birdhouseState.birdhouseSort).then(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, [page, birdhouseState.birdhouseSort]);
  return (
    !isLoading ?
      <Flex overflowX={"scroll"} flexDir={"column"} gap={1}>
        <Flex gap={5} alignItems={"center"} alignSelf={"center"}>
          <Link as={ReactLink} to="/birdhouse/create">
            <Text
              whiteSpace={"nowrap"}
              m="10px"
              bgColor={"#1B9706"}
              color="white"
              borderRadius={20}
              p="10px">
              Create a Birdhouse
            </Text>
          </Link>
          { !editable ? <SortSelect setSort={setSort} route={`/admin/birdhouses?page=1`}/> : null }
        </Flex>
        <Table minH={"80vh"} bgColor={"white"} variant="simple">
          <Thead>
            <Tr border={"1px solid rgba(0, 0, 0, .2)"}>
              { columns.map((c) => (
                <Th border={"1px solid rgba(0, 0, 0, .2)"} key={c.text}>
                  {c.text}
                </Th>
              )) }
            </Tr>
          </Thead>
          <Tbody>
            {  birdhouseState.birdhouses.map((b: BirdhouseInterface) => (
              <BirdhouseCell
                key={b.birdhouseId}
                birdhouseId={b.birdhouseId}
                update={update}
                remove={remove}
                description={b.description}
                name={b.name}
                price={`${b.price}`}
                size={`${b.size}`}
                stock={`${b.stock}`}
                styles={b.styles}
                pictures={b.pictures}
                status={b.status}
                socialMedia={b.socialMedia}
                editable={editable}
                setEditable={setEditable}
              />
            )) }
          </Tbody>
        </Table>
        <Flex justifyContent={"center"}>
          <Pagination route="/admin/birdhouses" totalPages={parseInt(birdhouseState.totalPages || "1")} currentPage={parseInt(page || "1")} sort={birdhouseState.birdhouseSort}/>
        </Flex>
      </Flex>
      : <CircularProgress isIndeterminate/>);
};

export default BirdhouseTable;
