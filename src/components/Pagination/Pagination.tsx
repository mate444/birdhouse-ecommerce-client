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
  for (let i = 0; i < props.totalPages; i+=1) {
    pages.push(i + 1);
  }
  return (
    <HStack spacing="10">
      {
        props.currentPage > 1 &&
          <Link 
            as={ReactLink}
            to={`${props.route}?page=${props.currentPage - 1}&sort=${props.sort}`}>
            <FaChevronLeft color="1B9706" />
          </Link>
      }
      { pages.map((p, i) => (
        <Link key={i} as={ReactLink} to={`${props.route}?page=${p}&sort=${props.sort}`}>{p}</Link>
      )) }
      {
        props.currentPage < props.totalPages &&
        <Link 
          as={ReactLink}
          to={`${props.route}?page=${props.currentPage + 1}&sort=${props.sort}`}>
          <FaChevronRight color="1B9706" />
        </Link>
      }
    </HStack>
  );
};

export default Pagination;
