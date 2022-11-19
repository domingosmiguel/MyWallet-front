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
import styled from 'styled-components';

export default function MyModal({
  modalHeader,
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
    <Modal onClose={onClose} size='sm' isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalTxt}</ModalBody>
        <ModalFooter>
          <ThemeButton onClick={onClose}>Close</ThemeButton>
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
const ThemeButton = styled(Button)`
  color: ${({ theme }) => theme.colors.secondary};

  // for higher css specificity
  :nth-child(n) {
    background-color: ${({ theme }) => theme.colors.main};
    :hover {
      background-color: ${({ theme }) => theme.colors.lightMain};
    }
  }
`;
