import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FC, useRef } from "react";
import { IsSettingModalOpenAtom } from "../atoms";
import ApikeyInput from "./apikeyinput";

const SettingModal: FC = () => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [isOpen, setIsOpen] = useAtom(IsSettingModalOpenAtom);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ApikeyInput />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingModal;
