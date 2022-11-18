import { EmailIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';

export default function userRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const handleSubmission = (e) => {
    const URL = `${process.env.REACT_APP_BASE_URL}/sign-up`;
    e.preventDefault();
    setLoading(true);
    const data = { ...login };
    delete data.repeatPassword;
    axios
      .post(URL, data)
      .then(({ data, status }) => {
        console.log({ data, status });
        navigate('/');
      })
      .catch(({ response: { data, status } }) => {
        console.log({ data, status });
        setLoading(false);
      });
  };
  const handleForm = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <Page>
      <Logo>MyWallet</Logo>
      <Form onSubmit={handleSubmission}>
        <AllInputs spacing={0}>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={BsFillPersonFill} color='gray.300' />}
            />
            <Input
              name='name'
              onChange={handleForm}
              value={login.name}
              focusBorderColor='main'
              variant='flushed'
              placeholder='name'
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<EmailIcon color='gray.300' />}
            />
            <Input
              name='email'
              onChange={handleForm}
              value={login.email}
              focusBorderColor='main'
              variant='flushed'
              type='email'
              placeholder='email'
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<UnlockIcon color='gray.300' />}
            />
            <Input
              name='password'
              onChange={handleForm}
              value={login.password}
              pr='1rem'
              focusBorderColor='main'
              variant='flushed'
              type='password'
              placeholder='password'
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<LockIcon color='gray.300' />}
            />
            <Input
              name='repeatPassword'
              onChange={handleForm}
              value={login.repeatPassword}
              pr='1rem'
              focusBorderColor='main'
              variant='flushed'
              type='password'
              placeholder='repeat password'
              isRequired
            />
          </InputWrap>
        </AllInputs>
        <MainButton>Register</MainButton>
      </Form>
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
const Form = styled.form`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
`;
const AllInputs = styled(Stack)`
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
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;

  :hover {
    text-decoration: underline;
  }
`;
