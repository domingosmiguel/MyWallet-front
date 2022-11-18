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

export default function MyModal({
  modalTxt,
  isOpen,
  onClose,
  callback,
  btnTxt,
}) {
  function handleClick() {
    onClose();
    callback();
  }
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
            <Button variant='ghost' onClick={handleClick}>
              {btnTxt}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
