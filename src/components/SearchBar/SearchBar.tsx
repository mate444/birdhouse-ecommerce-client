import { FC, useState } from "react";
import { Box, Input } from "@chakra-ui/react";

interface ISearchBarProps {
  handleSubmit: (search: string) => void;
}

const SearchBar: FC<ISearchBarProps> = (props) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <Box m={"10px"} alignItems={"center"}>
      <Input
        ml="10px"
        borderRadius={20}
        width={["45vw", "45vw", "20vw"]}
        placeholder="Search..."
        _placeholder={{ color: "white", opacity: 0.5 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.handleSubmit(search.trim());
        }} onChange={handleChange} value={search} />
    </Box>
  );
};


export default SearchBar;
