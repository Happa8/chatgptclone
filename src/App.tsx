import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FC, Suspense, useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import ApikeyInput from "./components/apikeyinput";
import ChatItem from "./components/chatItem";
import {
  ApikeyAtom,
  InputPromptAtom,
  IsSettingModalOpenAtom,
  PostMessageAtom,
  PostStatusAtom,
} from "./atoms";
import SettingModal from "./components/settingModal";
import InputArea from "./components/inputArea";

export type Role = "system" | "user" | "assistant";
export type Message = {
  role: Role;
  content: string;
};

const App: FC = () => {
  const [messages, setMessages] = useAtom(PostMessageAtom);

  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastChatRef?.current?.scrollIntoView();
  }, [messages]);

  return (
    <Suspense>
      <VStack w="100%" h="100dvh">
        <Text paddingTop={4} fontSize={"smaller"} color="gray.400">
          ChatGPTクローン by{" "}
          <Link fontWeight={"bold"} href="https://twitter.com/happa_eight">
            Happa8
          </Link>
        </Text>
        <SettingModal />
        <Box
          p={4}
          maxW={800}
          h="100%"
          w="100%"
          overflow={"auto"}
          position={"relative"}
        >
          <Flex
            w="100%"
            h="100%"
            flexDirection={"column-reverse"}
            justifyContent="flex-start"
            gap={4}
          >
            <InputArea />
            <Box flexGrow={1} overflowY={"auto"}>
              <VStack align={"start"} justifyContent={"flex-end"}>
                {messages.map((message, i) => (
                  <ChatItem
                    key={message.content}
                    message={message}
                    ref={i === messages.length - 1 ? lastChatRef : undefined}
                  />
                ))}
              </VStack>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Suspense>
  );
};

export default App;
