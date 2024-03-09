import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import EventCard from "../Components/molecules/EventCard";

const EventPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [playingEvents, setPlayingEvents] = useState([]);
  const [waitlistedEvents, setWaitlistedEvents] = useState([]);
  const token = JSON.parse(localStorage.getItem("sportsToken"));

  const fetchAttending = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios
        .get("http://localhost:8080/event/getAttending", config)
        .then((res) => {
          setPlayingEvents(res.data);
        });
    } catch (error) {
      toast({
        title: "Failed to load Events",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchWaitlisted = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios
        .get("http://localhost:8080/event/getWaitlisted", config)
        .then((res) => {
          setWaitlistedEvents(res.data);
        });
    } catch (error) {
      toast({
        title: "Failed to load Events",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchAttending();
    fetchWaitlisted();
  }, []);

  return (
    <Tabs variant="soft-rounded" w="90%" m="20px auto">
      <TabList mb="1em">
        <Tab w="50%">Attending</Tab>
        <Tab w="50%">Waitlisted</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid p={2} columns={[1, 2, 3]} spacing="20px">
            {playingEvents.map((ev) => {
              return <EventCard key={ev._id} ev={ev} user={user} />;
            })}
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <SimpleGrid p={2} columns={[1, 2, 3]} spacing="20px">
            {waitlistedEvents.map((ev) => {
              return <EventCard key={ev._id} ev={ev} user={user} />;
            })}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default EventPage;
