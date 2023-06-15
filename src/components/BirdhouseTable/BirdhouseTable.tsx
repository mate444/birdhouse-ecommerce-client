import { FC, useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useToast
} from "@chakra-ui/react";
import BirdhouseCell from "../BirdhouseCell/BirdhouseCell";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { useSearchParams } from "react-router-dom";
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
  const [queryParams, setQueryParams] = useSearchParams();
  const toast = useToast();
  const { getAll } = useBirdhouseActions(toast);
  const birdhouseState = useRecoilValue(birdhousesAtom);
  let page = queryParams.get("page");
  useEffect(() => {
    if (page === null) page = "1";
    getAll(page, birdhouseState.birdhouseSearch).then(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    !isLoading ? <Table variant="simple">
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
            description={b.description}
            name={b.name}
            price={`${b.price}`}
            size={`${b.size}`}
            stock={`${b.stock}`}
            styles={b.styles}
            pictures={b.pictures}  
          />
        )) }
      </Tbody>
    </Table>
      : <CircularProgress isIndeterminate/>);
};

export default BirdhouseTable;
