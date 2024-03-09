import React from "react";

export const NoEventsScreen = () => {
  return (
    <Box>
      <Image
        w="350px"
        m="20px auto"
        src="https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
      />
      <Text fontSize="2xl" fontWeight="600">
        We could not find any events near you :(
      </Text>
    </Box>
  );
};
