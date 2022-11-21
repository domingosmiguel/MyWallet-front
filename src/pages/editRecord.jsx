import { Icon, ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillCalendarFill } from 'react-icons/bs';
import { TbArrowsUpDown } from 'react-icons/tb';
import { GoTextSize } from 'react-icons/go';
import { SiCashapp } from 'react-icons/si';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';
import useForm from '../hooks/useForm';
import useAxiosRequest from '../hooks/useAxiosRequest';

export default function EditRecord({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editData, updateForm, setForm] = useForm({
    date: '',
    value: '',
    description: '',
    way: '',
  });
  const [[dataGet, errorGet, loadedGet]] = useAxiosRequest(
    true,
    `/record/edit/${id}`,
    'get',
    '',
    {
      Authorization: `Bearer ${token}`,
    }
  );
  useEffect(() => {
    if (dataGet && loadedGet) {
      setForm(dataGet.data);
      setLoading(false);
    } else if (loadedGet) {
      console.log(errorGet);
      navigate('/');
    }
  }, [dataGet, errorGet]);

  const [[dataPut, errorPut, loadedPut], setRunAxiosPut] = useAxiosRequest(
    false,
    `/record/edit/${id}`,
    'put',
    editData,
    {
      Authorization: `Bearer ${token}`,
    }
  );
  useEffect(() => {
    if (loadedPut) {
      navigate('/records');
      if (errorPut) console.log(errorPut);
    }
  }, [dataPut, errorPut]);
  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    setRunAxiosPut(Date.now());
  };
  return (
    <Page>
      <Header>
        <Link to='/records'>
          <ChevronLeftIcon color='secondary' w={7} h={7} />
        </Link>
        <Title>edit cash flow</Title>
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
              value={editData.date}
              pr='0.5rem'
              focusBorderColor='main'
              variant='flushed'
              placeholder='date'
              type='date'
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
              value={editData.value}
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
              value={editData.description}
              pr='1rem'
              focusBorderColor='main'
              variant='flushed'
              type='text'
              placeholder='description'
              disabled={loading}
              isRequired
            />
          </InputWrap>
          <InputWrap size='lg'>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={TbArrowsUpDown} color='gray.300' />}
            />
            <Select
              name='way'
              placeholder='Select option'
              focusBorderColor='main'
              variant='flushed'
              pl='3rem'
              onChange={updateForm}
              value={editData.way}
              disabled={loading}
              isRequired
            >
              <option value='in'>inflow</option>
              <option value='out'>outflow</option>
            </Select>
          </InputWrap>
        </AllInputs>
        <MainButton isLoading={loading}>Update record</MainButton>
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
const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1.938rem;
`;
const Form = styled.form`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
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
