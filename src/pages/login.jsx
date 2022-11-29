import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import MainLink from '../components/mainLink';
import useAxiosRequest from '../hooks/useAxiosRequest';
import useForm from '../hooks/useForm';

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
      <MySection>
        <Logo>MyWallet</Logo>
        <Form onSubmit={handleSubmission}>
          <AllInputs spacing={0}>
            <InputWrap size='lg'>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='gray.300' />}
              />
              <InputWrap
                name='email'
                onChange={updateForm}
                value={login.email}
                focusBorderColor='main'
                variant='flushed'
                type='email'
                placeholder='email'
                disabled={loading}
                $isRequired
              />
            </InputWrap>
            <InputWrap size='lg'>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.300' />}
              />
              <InputWrap
                name='password'
                onChange={updateForm}
                value={login.password}
                pr='1rem'
                focusBorderColor='main'
                variant='flushed'
                type='password'
                placeholder='password'
                disabled={loading}
                $isRequired
              />
            </InputWrap>
          </AllInputs>
          <MainButton isLoading={loading}>Login</MainButton>
        </Form>
        <div
          id='g_id_onload'
          data-client_id='YOUR_GOOGLE_CLIENT_ID'
          data-login_uri='https://your.domain/your_login_endpoint'
          data-auto_prompt='false'
        />
        <div
          className='g_id_signin'
          data-type='icon'
          data-size='large'
          data-theme='outline'
          data-text='sign_in_with'
          data-shape='square'
          data-width={40}
        />
        <MainLink to='/register' disabled={loading}>
          First time here? Sign-up!
        </MainLink>
      </MySection>
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
const MySection = styled.section`
  width: 100%;
  max-width: ${({ theme }) => `calc(${theme.sizes.max} + 4rem)`};
  height: fit-content;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.darkMain};
  background: ${({ theme }) => theme.colors.main};
  box-shadow: 1rem 1rem 3rem ${({ theme }) => theme.colors.darkMain},
    -1rem -1rem 3rem ${({ theme }) => theme.colors.lightMain};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: fit-content;
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
