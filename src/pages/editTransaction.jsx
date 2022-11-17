import { Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillCalendarFill } from 'react-icons/bs';
import { GoTextSize } from 'react-icons/go';
import { SiCashapp } from 'react-icons/si';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';

export default function EditTransaction() {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = 'teste';
  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}/transaction/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(URL, config)
      .then((response) => setTransactionData(response))
      .catch();
  }, []);
  if (transactionData !== null) {
    setLoading(false);
  }

  return (
    <Page>
      <Header>
        <Title>
          Edit cash{' '}
          {transactionData.way.toLowerCase() === 'in' ? 'inflow' : 'outflow'}
        </Title>
      </Header>
      <AllInputs spacing={0}>
        <InputWrap size='lg'>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={BsFillCalendarFill} color='gray.300' />}
          />
          <Input
            pr='0.5rem'
            focusBorderColor='main'
            variant='flushed'
            placeholder='date'
            type='date'
          />
        </InputWrap>
        <InputWrap size='lg'>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={SiCashapp} color='gray.300' />}
          />
          <Input
            focusBorderColor='main'
            variant='flushed'
            placeholder='value'
          />
        </InputWrap>
        <InputWrap size='lg'>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={GoTextSize} color='gray.300' />}
          />
          <Input
            pr='1rem'
            focusBorderColor='main'
            variant='flushed'
            type='text'
            placeholder='description'
          />
        </InputWrap>
      </AllInputs>
      <MainButton>
        Update cash{' '}
        {transactionData.way.toLowerCase() === 'in' ? 'inflow' : 'outflow'}
      </MainButton>
    </Page>
  );
}

const Page = styled(Div100vh)`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.generalPadding};
`;
const Header = styled.header`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  height: 5.5rem;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1.938rem;
`;
const AllInputs = styled(Stack)`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  margin: 0.25rem 0;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
`;
const InputWrap = styled(InputGroup)`
  border: 0 none;
  outline: 0;
  font-family: ${({ theme }) => theme.fonts.body};
`;
