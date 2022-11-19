import { Icon, ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BsFillCalendarFill } from 'react-icons/bs';
import { TbArrowsUpDown } from 'react-icons/tb';
import { GoTextSize } from 'react-icons/go';
import { SiCashapp } from 'react-icons/si';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../components/mainButton';

export default function EditRecord({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    date: '',
    value: '',
    description: '',
    way: '',
  });

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}/record/edit/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(URL, config)
      .then(({ data }) => {
        setEditData(data);
        setLoading(false);
      })
      .catch(({ response: { data, status } }) => {
        console.log({ data, status });
        navigate('/');
      });
  }, []);
  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    const URL = `${process.env.REACT_APP_BASE_URL}/record/edit/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(URL, editData, config)
      .then(() => {
        navigate('/records');
      })
      .catch(({ response: { data, status } }) => {
        console.log({ data, status });
        navigate('/records');
      });
  };
  const handleForm = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  return (
    <Page>
      <Header>
        <Link to='/records'>
          <ChevronLeftIcon color='secondary' w={7} h={7} />
        </Link>
        <Title>{loading ? <Skeleton w={60} h={9} /> : 'edit cash flow'}</Title>
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
              onChange={handleForm}
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
              onChange={handleForm}
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
              onChange={handleForm}
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
              onChange={handleForm}
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
