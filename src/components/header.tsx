import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Box
      w="100%"
      boxShadow={"base"}
      // bgColor={"gray.100"}
      p={4}
      borderRadius={4}
    >
      <Heading fontSize={20}>ChatGPTクローン</Heading>
    </Box>
  );
};

export default Header;
