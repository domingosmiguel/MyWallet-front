import { ChevronLeftIcon, Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillCalendarFill } from 'react-icons/bs';
import { GoTextSize } from 'react-icons/go';
import { SiCashapp } from 'react-icons/si';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import toastContext from '../contexts/toastContext';
import useAxiosRequest from '../hooks/useAxiosRequest';
import useForm from '../hooks/useForm';

export default function NewRecord({ token }) {
  const { way } = useParams();
  const navigate = useNavigate();

  const options = ['in', 'out'];

  useEffect(() => {
    if (!options.includes(way)) {
      console.error('Route not found');
      navigate('/');
    }
  }, []);

  const toast = useContext(toastContext);
  const [loading, setLoading] = useState(false);
  const [newData, updateForm] = useForm({
    date: '',
    value: '0.00',
    description: '',
  });

  const [[response, error, loaded], runAxios] = useAxiosRequest(
    false,
    `/record/${way}`,
    'post',
    { ...newData, way },
    {
      Authorization: `Bearer ${token}`,
    }
  );
  useEffect(() => {
    if (loaded) {
      toast({
        title: response ? 'success' : 'error',
        status: response ? 'success' : 'error',
        description: (response ? response?.data : error?.response?.data) ?? '',
      });
      navigate('/records');
    }
  }, [response, error]);
  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    runAxios(Date.now());
  };
  return (
    <Page>
      <Header>
        <Link to='/records'>
          <BackButton color='secondary' w={7} h={7} />
        </Link>
        <Title>new {way === 'in' ? 'inflow' : 'outflow'}</Title>
      </Header>
      <Form onSubmit={handleSubmission}>
        <AllInputs spacing={0}>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={BsFillCalendarFill} color='gray.300' />}
            />
            <Input
              name='date'
              onChange={updateForm}
              value={newData.date}
              pr='0.5rem'
              focusBorderColor='main'
              variant='flushed'
              type='date'
              placeholder='date'
              disabled={loading}
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={SiCashapp} color='gray.300' />}
            />
            <Input
              name='value'
              onChange={updateForm}
              value={newData.value}
              focusBorderColor='main'
              variant='flushed'
              placeholder='value'
              type='number'
              disabled={loading}
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={GoTextSize} color='gray.300' />}
            />
            <Input
              name='description'
              onChange={updateForm}
              value={newData.description}
              pr='1rem'
              focusBorderColor='main'
              variant='flushed'
              type='text'
              placeholder='description'
              disabled={loading}
              isRequired
            />
          </InputWrap>
        </AllInputs>
        <MainButton isLoading={loading}>Save record</MainButton>
      </Form>
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
  justify-content: space-between;
  align-items: center;
`;
const BackButton = styled(ChevronLeftIcon)`
  cursor: pointer;
  & :nth-child(n) {
    cursor: pointer;
  }
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  /* font-family: ${({ theme }) => theme.fonts.body}; */
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1.938rem;
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
