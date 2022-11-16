import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';

export default function Login() {
  const URL = `${process.env.REACT_APP_BASE_URL}/sing-in`;
  const handleLogin = () => {
    axios.post(URL);
  };
  return (
    <Page>
      <Logo>MyWallet</Logo>
      <AllInputs spacing={0}>
        <InputWrap size='lg'>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={BsFillPersonFill} color='gray.300' />}
          />
          <Input focusBorderColor='main' variant='flushed' placeholder='name' />
        </InputWrap>
        <InputWrap size='lg'>
          <InputLeftElement pointerEvents='none' children={<EmailIcon color='gray.300' />} />
          <Input focusBorderColor='main' variant='flushed' placeholder='email' />
        </InputWrap>
        <InputWrap size='lg'>
          <InputLeftElement pointerEvents='none' children={<LockIcon color='gray.300' />} />
          <Input
            pr='1rem'
            focusBorderColor='main'
            variant='flushed'
            type='password'
            placeholder='password'
          />
        </InputWrap>
        <InputWrap size='lg'>
          <InputLeftElement pointerEvents='none' children={<LockIcon color='gray.300' />} />
          <Input
            pr='1rem'
            focusBorderColor='main'
            variant='flushed'
            type='password'
            placeholder='repeat password'
          />
        </InputWrap>
      </AllInputs>
      <MainButton>Register</MainButton>
      <StyledLink to='/'>Already have a account? Sign-in!</StyledLink>
    </Page>
  );
}

const Page = styled(Div100vh)`
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.generalPadding};
`;
const Logo = styled.p`
  font-family: ${({ theme }) => theme.fonts.logo};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 2.5rem;
  line-height: 3.9rem;
  margin-bottom: 1.5rem;
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

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
`;
