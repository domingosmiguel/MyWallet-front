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

export default function MyModal({ isOpen, onClose, setLoading, deleteRecord }) {
  function handleClick() {
    setLoading(true);
    deleteRecord(Date.now());
    onClose();
  }
  return (
    <Modal onClose={onClose} size='sm' isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deletion confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This action can not be undone, do you want to continue?
        </ModalBody>
        <ModalFooter>
          <ThemeButton onClick={onClose}>Close</ThemeButton>
          <Button variant='ghost' onClick={handleClick}>
            Delete
          </Button>
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
