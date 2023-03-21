import {
  Box,
  Text,
  VStack,
  StackProps,
  BoxProps,
  forwardRef,
} from "@chakra-ui/react";
import { FC, ForwardedRef } from "react";
import { Message, Role } from "../App";

type Props = { message: Message } & StackProps & BoxProps;

const RoleStyle = (role: Role) => {
  switch (role) {
    case "assistant":
      return {
        bgColor: "gray.100",
        borderColor: "transparent",
      };
    case "user":
      return {
        bgColor: "white",
        borderColor: "gray.200",
      };
  }
};

const ChatItem = forwardRef<Props, "div">(({ message, ...props }, ref) => {
  return (
    <VStack
      align={"start"}
      spacing={0}
      bgColor="gray.100"
      w="100%"
      border="1px"
      p={4}
      borderRadius={4}
      ref={ref}
      {...RoleStyle(message.role)}
      {...props}
    >
      <Text fontSize={"small"} fontWeight="bold" whiteSpace={"pre-wrap"}>
        {message.role.toUpperCase()}
      </Text>
      <Text fontSize={"sm"} whiteSpace={"pre-wrap"}>
        {message.content}
      </Text>
    </VStack>
  );
});

export default ChatItem;
