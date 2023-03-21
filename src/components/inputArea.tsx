import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FC, useRef } from "react";
import {
  PostMessageAtom,
  InputPromptAtom,
  PostStatusAtom,
  IsSettingModalOpenAtom,
  ModelsList,
  CurrentModelAtom,
  Models,
  MessagesAtom,
} from "../atoms";
import { MdSend, MdOutlineDelete, MdOutlineSettings } from "react-icons/md";

const InputArea: FC = () => {
  const [_messages, postMessage] = useAtom(PostMessageAtom);
  const [inputPrompt, setInputPrompt] = useAtom(InputPromptAtom);
  const [status, _] = useAtom(PostStatusAtom);
  const [isOpen, setIsOpen] = useAtom(IsSettingModalOpenAtom);
  const [currentModel, setCurrentModel] = useAtom(CurrentModelAtom);
  const [messages, setMessages] = useAtom(MessagesAtom);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleSendMessage = () => {
    postMessage({
      role: "user",
      content: inputPrompt,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  const handleDeleteChat = () => {
    setMessages([]);
    onAlertClose();
  };

  return (
    <VStack
      w="100%"
      align={"start"}
      border="1px solid"
      borderColor={"gray.200"}
      p={4}
      borderRadius={4}
    >
      <Box position={"relative"} w="100%" fontSize={"1rem"} lineHeight={"1.8"}>
        <Textarea
          position={"absolute"}
          value={inputPrompt}
          placeholder="ここに文字を入力"
          onChange={(e) => {
            setInputPrompt(e.target.value);
          }}
          isDisabled={status == "loading"}
          onKeyDown={handleKeyDown}
          resize="none"
          top={0}
          left={0}
          display="block"
          overflow={"hidden"}
          boxSizing="border-box"
          width={"100%"}
          height={"100%"}
          backgroundColor="transparent"
          border="none"
          letterSpacing={"inherit"}
          lineHeight="1.8"
          overflowY={"auto"}
          p={0}
          _focus={{
            boxShadow: "none",
          }}
        />
        <Box
          aria-hidden="true"
          overflow={"hidden"}
          visibility="hidden"
          // color="red"
          boxSizing="border-box"
          minH="80px"
          maxH="50lvh"
          whiteSpace={"pre-wrap"}
          p={0}
          border="none"
          css={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {inputPrompt + "\u200b"}
        </Box>
      </Box>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader></AlertDialogHeader>
            <AlertDialogBody>
              会話履歴を削除してチャットを初期状態に戻しますか？この動作は取り消せません。
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                キャンセル
              </Button>
              <Button colorScheme={"red"} onClick={handleDeleteChat} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex flexWrap={"wrap"} alignItems="center" gap={2} w="100%">
        <Select
          value={currentModel}
          onChange={(e) => {
            setCurrentModel(e.target.value as Models);
          }}
          w={160}
        >
          {ModelsList.map((model) => (
            <option value={model} key={model}>
              {model}
            </option>
          ))}
        </Select>

        <Box flexGrow={1} />
        <Box
          cursor={"pointer"}
          color="gray.600"
          onClick={() => {
            setIsOpen(true);
          }}
          px={1}
        >
          <MdOutlineSettings fontSize={"1.8rem"} />
        </Box>
        <Box cursor={"pointer"} color="gray.600" px={1} onClick={onAlertOpen}>
          <MdOutlineDelete fontSize={"1.8rem"} />
        </Box>
        <Button
          colorScheme={"teal"}
          onClick={handleSendMessage}
          isLoading={status == "loading"}
          px={6}
          rightIcon={<MdSend />}
          variant="outline"
        >
          送信
        </Button>
      </Flex>
    </VStack>
  );
};

export default InputArea;
