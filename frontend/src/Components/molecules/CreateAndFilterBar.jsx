import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

const CreateAndFilterBar = ({
  handleFilter,
  fetchEvents,
  sportsArr,
  handleSearch,
}) => {
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token = JSON.parse(localStorage.getItem("sportsToken"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      await axios
        .post(`http://localhost:8080/event/add`, eventDetails, config)
        .then((res) => {
          toast({
            title: res.data.description,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          fetchEvents();
          setLoading(false);
          onClose();
        });
    } catch (e) {
      setLoading(false);
      toast({
        title: e.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Flex
        p="10px 30px"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        bgColor="	rgb(255,255,255)"
        color="black"
        zIndex="100"
        position="sticky"
        top="10vh"
      >
        <Button onClick={onOpen}>
          Create New Event
          <AddIcon ml={2} />
        </Button>
        <Input
          w="50%"
          fontSize="lg"
          onChange={(e) => {
            handleSearch(e);
          }}
          placeholder="Search events ..."
        />
        <Box>
          <Select
            placeholder="Filter by Sports"
            onChange={(e) => {
              handleFilter(e);
            }}
          >
            {sportsArr.map((sport) => {
              return (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              );
            })}
          </Select>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                onChange={handleChange}
                placeholder="Event Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                onChange={handleChange}
                placeholder="Add Event Description"
              />
            </FormControl>
            <Flex alignItems="center" justifyContent="space-between">
              <FormControl w="60%" mt={4}>
                <FormLabel>Event Date and Time :</FormLabel>
                <Input
                  ml="20%"
                  name="date"
                  w="70%"
                  onChange={handleChange}
                  type="datetime-local"
                />
              </FormControl>
              <FormControl w="30%" mt={4}>
                <FormLabel>Max Players :</FormLabel>
                <Input
                  ml="20%"
                  w="70%"
                  name="maxPlayers"
                  onChange={handleChange}
                  placeholder="00"
                  type="number"
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={loading}
              colorScheme="blue"
              onClick={handleAddEvent}
              mr={3}
            >
              {loading ? <Spinner /> : "Add"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAndFilterBar;
