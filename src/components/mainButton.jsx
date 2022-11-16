import React from 'react';
import styled from 'styled-components';

export default function MainButton({ children, isLoading, onClick }) {
  return <StyledButton onClick={onClick}>{isLoading ? 'carregando...' : children}</StyledButton>;
}

const StyledButton = styled.button`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  margin: 0.25rem 0;
  height: 2.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.lightMain};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
`;
