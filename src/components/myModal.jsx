import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

export default function MyModal(
  modalTxt,
  isOpen,
  onOpen,
  onClose,
  callback,
  btnTxt
) {
  return (
    <Modal onClose={onClose} size='sm' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTxt}</ModalHeader>
        <ModalCloseButton />
        <ModalBody />
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          {callback && (
            <Button variant='ghost' onClick={callback}>
              {btnTxt}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
