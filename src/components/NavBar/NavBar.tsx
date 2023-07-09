import { FC, useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  Icon,
  Menu,
  MenuItem, 
  useToast,
  MenuButton,
  MenuList,
  MenuDivider,
  Tooltip
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { FaListAlt, FaSearch, FaSignOutAlt, FaEllipsisV, FaTimes } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { useUserActions } from "../../actions/user.actions";
import { userAtom } from "../../states/user";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import Permission from "../Permission/Permission";
import SearchBar from "../SearchBar/SearchBar";
const NavBar: FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { logOut } = useUserActions(toast, navigate);
  const { setSearch } = useBirdhouseActions(toast);
  const user = useRecoilValue(userAtom);
  const handleSearch = (search: string) => {
    const page = "1";
    setSearch(search);
    navigate(`/?page=${page}`);
  };
  return (
    <Flex
      bg={"#1B9706"}
      color={"white"}
      h={"70px"}
      w={"100%"}
      pl={["30px", "30px", "60px"]}
      pr={["30px", "30px", "60px"]}
      alignItems={"center"}>
      <Link as={ReactLink} to="/">
        <Text>
          Logo
        </Text>
      </Link>
      <HStack
        display="flex"
        alignItems={"center"}
        spacing={10}
        ml={"auto"}>
        {
          !showSearchBar ? <Box alignSelf={"cente"} onClick={() => setShowSearchBar(!showSearchBar)}><FaSearch /></Box> : null
        }
        {
          showSearchBar ? <Flex>
            <SearchBar handleSubmit={handleSearch}/>
            <Box mt={"20px"} onClick={() => setShowSearchBar(!showSearchBar)}><FaTimes /></Box>
          </Flex> : null
        }
        <Menu>
          <MenuButton>
            <Icon as={FaEllipsisV}/>
          </MenuButton>
          <MenuList minW={"30px"} color="white" bg="#1B9706">
            <Permission allowedPermissions={["Dashboard"]}>
              <MenuItem bg="#1B9706">
                <Tooltip label="Dashboard">
                  <Link as={ReactLink} to="/admin/birdhouses">
                    <span>
                      <Icon as={FaListAlt} />
                    </span>
                  </Link>
                </Tooltip>
              </MenuItem>
            </Permission>
            { user.id ? <>
              <MenuDivider />
              <Tooltip label="Sign out">
                <MenuItem onClick={logOut} bg="#1B9706">
                  <span>
                    <Icon as={FaSignOutAlt}/>
                  </span>
                </MenuItem> 
              </Tooltip>
            </> : null 
            }
            { !user.id ? <Link as={ReactLink} to="/login"><MenuItem bg="#1B9706">Log In</MenuItem></Link> : null }
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default NavBar;
