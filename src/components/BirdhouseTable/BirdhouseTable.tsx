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
  Flex
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
  isNumeric: false
}, {
  text: "price",
  isNumeric: true
}, {
  text: "stock",
  isNumeric: true
}, {
  text: "size",
  isNumeric: true
}, {
  text: "description",
  isNumeric: false
}, {
  text: "styles",
  isNumeric: false
}];

const BirdhouseTable: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      <>
        <Link as={ReactLink} to="/birdhouse/create">
          <Flex
            m="10px"
            bgColor={"#1B9706"}
            color="white"
            width="25%"
            justify="center"
            borderRadius={20}
            p="10px">
            Create a Birdhouse
          </Flex>
        </Link>
        <SortSelect setSort={setSort} route={`/admin/birdhouses?page=1`}/>
        <Table variant="simple">
          <Thead>
            <Tr>
              { columns.map((c) => (
                <Th key={c.text} isNumeric={c.isNumeric}>
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
              />
            )) }
          </Tbody>
        </Table>
        <Pagination route="/admin/birdhouses" totalPages={parseInt(birdhouseState.totalPages || "1")} currentPage={parseInt(page || "1")} sort={birdhouseState.birdhouseSort}/>
      </>
      : <CircularProgress isIndeterminate/>);
};

export default BirdhouseTable;
