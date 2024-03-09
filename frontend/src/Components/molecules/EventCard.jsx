import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ ev, user }) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      w="100%"
      key={ev._id}
      m="30px auto"
      p="20px"
      borderRadius={10}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex
          alignItems={["flex-start", "flex-end", "flex-end"]}
          flexDir={["column", "row", "row"]}
        >
          <Text
            fontSize="3xl"
            textDecor="underline"
            fontWeight="600"
            letterSpacing={2}
          >
            {ev.title}
          </Text>
          <Text ml={[0, 5, 5]}>
            {`( ${ev.players.length}/${ev.maxPlayers} )`}
          </Text>
        </Flex>
        {user.id == ev.organiser._id ? (
          <Link to={`/event/${ev._id}`}>
            <Button variant="ghost">
              <EditIcon w={4} h={4} />
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Flex>
      <Text mt={5} ml={5} textAlign="left" fontSize="xl" fontStyle="italic">
        {ev.description}
      </Text>
      <Flex ml={[0, 0, 5]} mt={5}>
        <Link to={`/event/${ev._id}`}>
          <Button colorScheme="green">See Details</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default EventCard;
