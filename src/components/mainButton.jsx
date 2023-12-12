import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

export default function MainButton({ children, isLoading, onClick }) {
  return (
    <StyledButton onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='secondary'
          color='main'
          size='lg'
        />
      ) : (
        children
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  margin: 0.25rem 0;
  height: 2.875rem;
  font-family: ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.lightMain};
  color: ${({ theme }) => theme.colors.secondary} !important;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  :disabled {
    pointer-events: none;
    opacity: 0.85;
  }
`;
