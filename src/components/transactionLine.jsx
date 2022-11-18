import { SmallCloseIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function TransactionLine({
  id,
  date,
  description,
  value,
  way,
  openModal,
  setIdToDelete,
}) {
  return (
    <Father>
      <ChildLeft>{date}</ChildLeft>
      <ChildCenter to={`/record/edit/${id}`}>{description}</ChildCenter>
      <ChildRight way={way}>{value}</ChildRight>
      <Close
        color='lightLetters'
        onClick={() => {
          openModal();
          setIdToDelete(id);
        }}
      />
    </Father>
  );
}

const Father = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
const Close = styled(SmallCloseIcon)`
  cursor: pointer;
`;
