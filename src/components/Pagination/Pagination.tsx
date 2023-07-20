import { FC } from "react";
import { HStack, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  sort: string;
  route: string;
}

const Pagination: FC<PaginationProps> = (props) => {
  const pages = [];
  for (let i = 0; i < props.totalPages; i += 1) {
    pages.push(i + 1);
  }
  return (
    <HStack fontSize={"1.2em"} spacing={7} bgColor={"#1B9706"} color={"white"} py="10px" borderRadius={10} px="20px" m="0.2vh">
      {
        props.currentPage > 1 &&
          <Link 
            minW={"1vw"}
            as={ReactLink}
            to={`${props.route}?page=${props.currentPage - 1}&sort=${props.sort}`}>
            <FaChevronLeft color="white" />
          </Link>
      }
      { pages.map((p, i) => (
        <Link 
          textAlign={"center"}
          minW={"1vw"}
          color={props.currentPage === p ? "black" : "white"}
          key={i}
          as={ReactLink}
          to={`${props.route}?page=${p}&sort=${props.sort}`}>
          {p}
        </Link>
      )) }
      {
        props.currentPage < props.totalPages &&
        <Link
          minW={"1vw"}
          as={ReactLink}
          to={`${props.route}?page=${props.currentPage + 1}&sort=${props.sort}`}>
          <FaChevronRight color="white" />
        </Link>
      }
    </HStack>
  );
};

export default Pagination;
