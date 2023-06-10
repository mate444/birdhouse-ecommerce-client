import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  useColorModeValue,
  useBreakpointValue,
  Icon
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export default function NavBar() {

  return (
    <Box position={"sticky"}>
      <Flex
        bg={"#1B9706"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}>
        <Flex 
          flex={{ base: 1, md: "auto" }}
          ml={{ base: 2 }}
          display={{ base: "flex", md: "none" }}>
          <Link as={ReactLink} to="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}>
              Logo
            </Text>
          </Link>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}>
            <FaSearch />
            <Link as={ReactLink} to="/cart"><Icon as={FaShoppingCart}/></Link>
            <Link as={ReactLink} to="/login">Log In</Link>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
