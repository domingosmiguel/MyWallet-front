import { EmailIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import MainLink from '../components/mainLink';
import toastContext from '../contexts/toastContext';
import useAxiosRequest from '../hooks/useAxiosRequest';
import useForm from '../hooks/useForm';

export default function UserRegistration() {
  const toast = useContext(toastContext);
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showRepeatPw, setShowRepeatPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, updateForm] = useForm({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [[response, error, loaded], runAxios] = useAxiosRequest(
    false,
    '/sign-up',
    'post',
    login
  );
  useEffect(() => {
    if (loaded) {
      toast({
        title: response ? 'success' : 'error',
        status: response ? 'success' : 'error',
        description: (response ? response?.data : error?.response?.data) ?? '',
      });
      response ? navigate('/') : setLoading(false);
    }
  }, [response, error]);

  const inputNames = useMemo(
    () => ({
      pw: 'password',
      repeatPw: 'repeatPassword',
    }),
    []
  );
  const showInput = useMemo(
    () => ({
      [inputNames.pw]: () => setShowPw(!showPw),
      [inputNames.repeatPw]: () => setShowRepeatPw(!showRepeatPw),
    }),
    [showPw, showRepeatPw]
  );
  const handleClick = (event) => {
    const eventInputName =
      event?.target?.parentElement?.parentElement?.childNodes?.[1]?.name;
    showInput?.[eventInputName]();
  };

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
                children={<Icon as={BsFillPersonFill} color='gray.300' />}
              />
              <Input
                name='name'
                onChange={updateForm}
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
                children={<UnlockIcon color='gray.300' />}
              />
              <Input
                name='password'
                onChange={updateForm}
                value={login.password}
                pr='4.5rem'
                focusBorderColor='main'
                variant='flushed'
                type={showPw ? 'text' : 'password'}
                placeholder='password'
                disabled={loading}
                isRequired
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {showPw ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputWrap>
            <InputWrap size='lg'>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.300' />}
              />
              <Input
                name='repeatPassword'
                onChange={updateForm}
                value={login.repeatPassword}
                pr='4.5rem'
                focusBorderColor='main'
                variant='flushed'
                type={showRepeatPw ? 'text' : 'password'}
                placeholder='repeat password'
                disabled={loading}
                isRequired
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {showRepeatPw ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputWrap>
          </AllInputs>
          <MainButton isLoading={loading}>Register</MainButton>
        </Form>
        <MainLink to='/' disabled={loading}>
          Already have a account? Sign-in!
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
  margin-bottom: 1rem;
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
