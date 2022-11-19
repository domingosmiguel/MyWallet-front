import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import Div100vh from 'react-div-100vh';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import MainLink from '../components/mainLink';

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const handleSubmission = (e) => {
    const URL = `${process.env.REACT_APP_BASE_URL}/sign-in`;
    e.preventDefault();
    setLoading(true);
    axios
      .post(URL, login)
      .then((res) => {
        setToken(res.data);
        navigate('/records');
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
              children={<EmailIcon color='gray.300' />}
            />
            <Input
              name='email'
              onChange={handleForm}
              value={login.email}
              focusBorderColor='main'
              variant='flushed'
              // type='email'
              placeholder='email'
              disabled={loading}
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<LockIcon color='gray.300' />}
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
              disabled={loading}
              isRequired
            />
          </InputWrap>
        </AllInputs>
        <MainButton isLoading={loading}>Login</MainButton>
      </Form>
      <MainLink to='/register' disabled={loading}>
        First time here? Sign-up!
      </MainLink>
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
