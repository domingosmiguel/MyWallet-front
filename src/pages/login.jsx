import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import MainLink from '../components/mainLink';
import useForm from '../hooks/useForm';
import useAxiosRequest from '../hooks/useAxiosRequest';

export default function Login({ token, setToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, updateForm] = useForm({
    email: '',
    password: '',
  });
  const [[data, error, loaded], runAxios] = useAxiosRequest(
    false,
    '/sign-in',
    'post',
    login
  );
  useEffect(() => {
    if (token !== null) {
      navigate('/records');
    }
  });
  useEffect(() => {
    if (data && loaded) {
      setToken(data.data);
      const serializedToken = JSON.stringify(data.data);
      localStorage.setItem('token', serializedToken);
      navigate('/records');
    } else if (loaded) {
      console.log(error);
      setLoading(false);
    }
  }, [data, error]);

  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    runAxios(Date.now());
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
              onChange={updateForm}
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
              children={<LockIcon color='gray.300' />}
            />
            <Input
              name='password'
              onChange={updateForm}
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
