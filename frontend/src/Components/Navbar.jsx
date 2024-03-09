import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Nav() {
  const { isAuth, user, logOut } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <>
      <Box
        px={4}
        color="white"
        position="sticky"
        top="0"
        zIndex="101"
        bgColor="#4636c5"
        h="10vh"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link to="/">
              <Text
                cursor="pointer"
                fontSize="3xl"
                fontStyle="italic"
                fontWeight="bold"
                _hover={{
                  fontSize: "4xl",
                }}
              >
                Sports App
              </Text>
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems="center" spacing={7}>
              <Link to="/events">
                <Text
                  _hover={{
                    textDecor: "underline",
                  }}
                  cursor="pointer"
                  fontSize="lg"
                  fontWeight="500"
                  m="0"
                  p="0"
                >
                  My Events
                </Text>
              </Link>
              <Button variant="ghost" onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isAuth ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.avatar} alt={user.name} />
                  </MenuButton>
                  <MenuList alignItems={"center"} color="black">
                    <Center>
                      <Text
                        fontWeight="600"
                        textTransform="capitalize"
                        fontSize="xl"
                      >
                        {user.name}
                      </Text>
                    </Center>
                    <MenuDivider />
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link to="/login">
                  <Text
                    _hover={{
                      textDecor: "underline",
                    }}
                    cursor="pointer"
                    fontSize="lg"
                    fontWeight="500"
                    m="0"
                    p="0"
                  >
                    Login
                  </Text>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
