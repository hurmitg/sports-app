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

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreds({ ...creds, [name]: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    console.log(creds);
    try {
      await axios
        .post(`http://localhost:8080/user/signup`, creds)
        .then((res) => {
          setLoading(false);
          toast({
            title: "Account Created Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/login");
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
          Get started with a free account{" "}
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
                handleSignup();
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
              Create Account
            </Button>
          )}
        </FormControl>
        <Text w="66%" textAlign="left" fontSize="lg" mb="20px">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            {" "}
            Log in
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
