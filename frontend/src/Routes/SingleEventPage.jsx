import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Spinner,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

const SingleEventPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [currEvent, setCurrEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [waitlisted, setWaitlisted] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const toast = useToast();
  const token = JSON.parse(localStorage.getItem("sportsToken"));

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post(`http://localhost:8080/event/get`, { id }, config)
        .then((res) => {
          setCurrEvent(res.data);
          for (let i = 0; i < res.data.players.length; i++) {
            if (res.data.players[i]._id == user.id) {
              setPlaying(true);
              break;
            }
          }
          for (let i = 0; i < res.data.waitlist.length; i++) {
            if (res.data.waitlist[i]._id == user.id) {
              setWaitlisted(true);
              break;
            }
          }
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        title: e.reponse.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addToWaitlist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setButtonLoading(true);
      await axios
        .patch(`http://localhost:8080/event/addToWaitlist`, currEvent, config)
        .then((res) => {
          setWaitlisted(true);
          setButtonLoading(false);
        });
    } catch (e) {
      setButtonLoading(false);
      toast({
        title: e.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const deleteUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setButtonLoading(true);
      await axios
        .patch(`http://localhost:8080/event/addToWaitlist`, currEvent, config)
        .then((res) => {
          setWaitlisted(true);
          setButtonLoading(false);
        });
    } catch (e) {
      setButtonLoading(false);
      toast({
        title: e.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .patch(
          `http://localhost:8080/event/addToPlayers`,
          { currEvent, id },
          config
        )
        .then((res) => {
          fetchEvent();
        });
    } catch (e) {
      toast({
        title: e.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (loading) {
    return <Spinner m="30px auto" />;
  }

  return (
    <Flex
      m="40px auto"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      borderRadius={10}
      p={5}
      w={["90vw", "80vw", "70vw"]}
    >
      <Image src="https://source.unsplash.com/300x350/?sports" />
      <Box ml={[0, 0, 10]} textAlign="left">
        <Text fontSize="4xl" textDecor="underline">
          {currEvent.title}
        </Text>
        <Text fontSize="lg" m="15px 0">
          {currEvent.description}
        </Text>
        <Text>
          Event Date : <b>{currEvent.date?.split("T")[0]}</b>
        </Text>
        <Text>
          Starting At : <b>{currEvent.startTime}</b>
        </Text>
        <Text>
          Organised By : <b>{currEvent.organiser.username}</b>
        </Text>
        <Text>
          Spots Left :{" "}
          <b>{`${currEvent.maxPlayers - currEvent.players.length} / ${
            currEvent.maxPlayers
          }`}</b>
        </Text>
        {user.id == currEvent.organiser._id ? (
          <>
            <Flex mt="10px" alignItems="center">
              <Text display="inline" fontSize="lg">
                Waitlist :
              </Text>
              <Flex flexWrap="wrap">
                {currEvent.waitlist.map((player) => {
                  return (
                    <Tag
                      p="3px 10px"
                      textTransform="capitalize"
                      m="10px"
                      key={player._id}
                    >
                      {player.username}
                      <Button
                        onClick={() => {
                          addUser(player._id);
                        }}
                        ml="3px"
                        size="xs"
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteUser(player._id);
                        }}
                        size="xs"
                      >
                        <DeleteIcon />
                      </Button>
                    </Tag>
                  );
                })}
              </Flex>
            </Flex>
            <Flex mt="10px" alignItems="center">
              <Text display="inline" fontSize="lg">
                Players :
              </Text>
              <Flex flexWrap="wrap">
                {currEvent.players.map((player) => {
                  return (
                    <Tag
                      p="5px 10px"
                      colorScheme="green"
                      textTransform="capitalize"
                      m="10px"
                      key={player._id}
                    >
                      {player.username}
                    </Tag>
                  );
                })}
              </Flex>
            </Flex>
          </>
        ) : waitlisted ? (
          <Button mt={5} colorScheme="green" disabled>
            In Waitlist
          </Button>
        ) : playing ? (
          <>
            <Flex mt="10px" alignItems="center">
              <Text display="inline" fontSize="lg">
                Players :
              </Text>
              <Flex flexWrap="wrap">
                {currEvent.players.map((player) => {
                  return (
                    <Tag
                      p="5px 10px"
                      colorScheme="green"
                      textTransform="capitalize"
                      m="10px"
                      key={player._id}
                    >
                      {player.username}
                    </Tag>
                  );
                })}
              </Flex>
            </Flex>
            <Button mt={5} disabled colorScheme="green">
              Attending
            </Button>
          </>
        ) : (
          <Button
            mt={5}
            isLoading={buttonLoading}
            onClick={addToWaitlist}
            colorScheme="green"
          >
            Request to Join
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default SingleEventPage;
