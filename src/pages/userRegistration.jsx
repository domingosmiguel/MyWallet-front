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
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import MainLink from '../components/mainLink';
import useForm from '../hooks/useForm';

export default function userRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, updateLogin] = useForm({
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
              onChange={updateLogin}
              value={login.name}
              focusBorderColor='main'
              variant='flushed'
              placeholder='name'
              disabled={loading}
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
              onChange={updateLogin}
              value={login.email}
              focusBorderColor='main'
              variant='flushed'
              type='email'
              placeholder='email'
              disabled={loading}
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
              onChange={updateLogin}
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
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<LockIcon color='gray.300' />}
            />
            <Input
              name='repeatPassword'
              onChange={updateLogin}
              value={login.repeatPassword}
              pr='1rem'
              focusBorderColor='main'
              variant='flushed'
              type='password'
              placeholder='repeat password'
              disabled={loading}
              isRequired
            />
          </InputWrap>
        </AllInputs>
        <MainButton isLoading={loading}>Register</MainButton>
      </Form>
      <MainLink to='/' disabled={loading}>
        Already have a account? Sign-in!
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
