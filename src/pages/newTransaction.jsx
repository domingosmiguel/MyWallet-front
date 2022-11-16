import { Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillCalendarFill } from 'react-icons/bs';
import { GoTextSize } from 'react-icons/go';
import { SiCashapp } from 'react-icons/si';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';

export default function NewTransaction() {
  const URL = `${process.env.REACT_APP_BASE_URL}/sing-in`;
  const { way } = useParams();
  console.log('🚀 ~ file: newTransaction.jsx ~ line 13 ~ newTransaction ~ way', way);
  const handleLogin = () => {
    axios.post(URL);
  };
  return (
    <Page>
      <Header>
        <Title>Cash {way === 'in' ? 'inflow' : 'outflow'}</Title>
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
          <Input focusBorderColor='main' variant='flushed' placeholder='value' />
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
      <MainButton>Save</MainButton>
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
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 50px;
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
