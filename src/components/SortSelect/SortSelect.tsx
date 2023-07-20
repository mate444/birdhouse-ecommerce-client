import { FC } from "react";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface ISortSelectProps {
  route: string;
  setSort: (sort: string) => void;
}

const sortTypes = [
  // {
  //   sort: "Price: Ascendent",
  //   value: "price_asc"
  // },
  // {
  //   sort: "Price: Descendent",
  //   value: "price_desc"
  // },
  {
    sort: "A-Z",
    value: "name_asc"
  },
  {
    sort: "Z-A",
    value: "name_desc"
  }
  // {
  //   sort: "Size: Ascendent",
  //   value: "size_asc"
  // },
  // {
  //   sort: "Size: Descendent",
  //   value: "size_desc"
  // },
];

const SortSelect: FC<ISortSelectProps> = (props) => {
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(props.route);
    props.setSort(e.target.value);
  };
  return (
    <Select
      bgColor={"white"}
      textAlign={"center"}
      placeholder="Sort by:"
      onChange={handleChange}>
      {
        sortTypes.map((s) => (
          <option key={s.value} value={s.value}>{s.sort}</option>
        ))
      }
    </Select>
  );
};

export default SortSelect;
