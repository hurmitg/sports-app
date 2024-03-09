import React, { useContext } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth, logIn, token, setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      await axios
        .post(`http://localhost:8080/user/login`, creds)
        .then((res) => {
          setLoading(false);
          toast({
            title: "Login Success",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("sportsToken", JSON.stringify(res.data.token));
          setToken(res.data.token);
          logIn(res.data);
          navigate("/");
        });
    } catch (e) {
      setLoading(false);
      return toast({
        title: e.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (isAuth) {
    navigate("/");
    return;
  }

  return (
    <Flex w="100%" alignItems="center" direction={["column", "row", "row"]}>
      <Flex
        w={["100%", "100%", "60%"]}
        m="40px auto"
        p="20px 0"
        borderRadius="20px"
        direction="column"
        alignItems="center"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <Text
          fontWeight="600"
          fontStyle="italic"
          textDecor="underline"
          fontSize="4xl"
        >
          {" "}
          Sign in now to find your team mates{" "}
        </Text>
        <FormControl w="70%" mt="40px">
          <FormLabel fontWeight="400" mt="20px">
            USERNAME
          </FormLabel>
          <Input
            onChange={handleChange}
            name="username"
            type="text"
            border="none"
            borderBottom="1px solid grey"
            borderRadius="0"
          />

          <FormLabel fontWeight="400" mt="20px">
            PASSWORD
          </FormLabel>
          <Input
            onChange={handleChange}
            name="password"
            type="password"
            border="none"
            borderBottom="1px solid grey"
            borderRadius="0"
          />

          {loading ? (
            <Button
              w="100%"
              m="40px 0px"
              p="25px 20px"
              color="white"
              bg="#5846f5"
              variant="solid"
              borderRadius="30px"
              _hover={{ bg: "#4636c5" }}
            >
              <Spinner />
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleSignin();
              }}
              w="100%"
              m="40px 0px"
              p="25px 20px"
              color="white"
              bg="#5846f5"
              variant="solid"
              borderRadius="30px"
              _hover={{ bg: "#4636c5" }}
            >
              Sign In
            </Button>
          )}
        </FormControl>
        <Text w="66%" textAlign="left" fontSize="lg" mb="20px">
          New to our App?{" "}
          <Link
            to="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            {" "}
            Sign Up
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
