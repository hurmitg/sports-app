import { Box, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import EventCard from "../Components/molecules/EventCard";
import CreateAndFilterBar from "../Components/molecules/CreateAndFilterBar";
import { AuthContext } from "../Context/AuthContext";
import BackendClient from "../Clients/SportsBackendClient";
import { NoEventsScreen } from "../Components/atoms/NoEventsScreen";

const HomePage = () => {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sportsArr, setSportsArr] = useState([]);
  const [mainData, setMainData] = useState([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      BackendClient.get("/event/get").then((res) => {
        let eventsArr = res.data.data[0].events;
        setEvents(eventsArr);
        setMainData(eventsArr);
        let sports = [];
        eventsArr.forEach((sport) => {
          if (!sports.includes(sport.title)) sports.push(sport.title);
        });
        setSportsArr(sports);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to load Events",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleFilter = async (e) => {
    let select = e.target.value;
    let sorted = [...mainData];
    if (select === "") {
      setEvents(sorted);
      return;
    }
    let filtered = sorted.filter((a) => {
      return a.title === select;
    });
    setEvents(filtered);
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    let sorted = [...mainData];
    if (query === "") {
      setEvents(sorted);
      return;
    }
    let filtered = sorted.filter((a) => {
      return a.title.includes(query) || a.description.includes(query);
    });
    setEvents(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {loading ? (
        <Heading>Loading.....</Heading>
      ) : (
        <>
          <CreateAndFilterBar
            sportsArr={sportsArr}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            fetchEvents={fetchEvents}
          />
          {!loading && events.length <= 0 && <NoEventsScreen />}
          {events.length > 0 && (
            <Box m="auto" w={["90%", "80%", "75%"]}>
              {events?.map((event) => {
                return <EventCard key={event._id} ev={event} user={user} />;
              })}
            </Box>
          )}{" "}
        </>
      )}
    </>
  );
};

export default HomePage;
