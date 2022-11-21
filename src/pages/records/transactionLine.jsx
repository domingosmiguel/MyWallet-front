import { SmallCloseIcon } from '@chakra-ui/icons';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export default function TransactionLine({
  id,
  delay,
  date,
  description,
  value,
  way,
  openModal,
  setIdToDelete,
}) {
  return (
    <Father delay={delay / 30}>
      <ChildLeft>{date}</ChildLeft>
      <ChildCenter to={`/record/edit/${id}`}>{description}</ChildCenter>
      <ChildRight way={way}>{value}</ChildRight>
      <CloseButton
        color='lightLetters'
        onClick={() => {
          openModal();
          setIdToDelete(id);
        }}
      />
    </Father>
  );
}

const swingIn = keyframes`
  0% {
    transform: rotateX(-100deg);
    transform-origin: top;
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    transform-origin: top;
    opacity: 1;
  }
`;

const Father = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  animation: ${swingIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    ${({ delay }) => `${delay}s`} both;
`;
const ChildLeft = styled.div`
  color: ${({ theme }) => theme.colors.lightLetters};
  min-width: 2.75rem;
`;
const ChildCenter = styled(Link)`
  color: ${({ theme }) => theme.colors.letters};
  width: 100%;
  padding-left: ${({ theme }) => theme.space.generalPadding};
  padding-right: ${({ theme }) => theme.space.generalPadding};
`;
const ChildRight = styled.div`
  color: ${({ way, theme }) =>
    way === 'in' ? theme.colors.green : theme.colors.red};
  padding-left: ${({ theme }) => theme.space.generalPadding};
  padding-right: ${({ theme }) => theme.space.generalPadding};
  width: 6rem;
  display: flex;
  justify-content: end;
`;
const CloseButton = styled(SmallCloseIcon)`
  cursor: pointer;
  & :nth-child(n) {
    cursor: pointer;
  }
`;
