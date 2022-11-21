import { Icon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  Stack,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TransactionLine from './transactionLine';
import MyModal from '../../components/myModal';
import firstLetterToUpperCase from '../../functions/firstLetterToUpperCase';
import useLogout from '../../hooks/useLogout';
import useAxiosRequest from '../../hooks/useAxiosRequest';
import useDeleteData from '../../hooks/useDeleteData';
import useFirstRender from '../../hooks/useFirstRender';

export default function Records({ token, setToken }) {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = useLogout(setToken);
  const firstRender = useFirstRender();
  const [deleteRecord, setIdToDelete, deleted] = useDeleteData(
    token,
    setLoading
  );

  const [[response, error, loaded], runAxios] = useAxiosRequest(
    true,
    '/records',
    'get',
    '',
    {
      Authorization: `Bearer ${token}`,
    }
  );
  useEffect(() => {
    if (response && loaded) {
      setRecords(response.data.userRecords);
      setUser(response.data.user);
      setLoading(false);
    } else if (loaded) {
      console.log(error);
      logout(Date.now());
    }
  }, [response, error]);
  useEffect(() => {
    setBalance(
      records
        .reduce(
          (acc, cur) =>
            acc +
            (cur.way === 'in' ? parseFloat(cur.value) : -parseFloat(cur.value)),
          0
        )
        .toFixed(2)
    );
  }, [records]);

  useEffect(() => {
    if (!firstRender()) {
      runAxios(Date.now());
    }
  }, [deleted]);

  function skeletons(n) {
    const skeletonsNumber = [];
    for (let i = 0; i < n; i++) {
      skeletonsNumber.push(0);
    }
    return (
      <Stack
        divider={<StackDivider />}
        spacing='1'
        pos='absolute'
        left={3}
        right={3}
      >
        {skeletonsNumber.map((x, index) => (
          <Skeleton key={index} height={6} />
        ))}
      </Stack>
    );
  }
  function dataContainer() {
    return (
      <Stack
        divider={<StackDivider />}
        spacing='1'
        pos='absolute'
        left={3}
        right={3}
      >
        {records.map((line, index) => (
          <TransactionLine
            key={line._id}
            id={line._id}
            delay={index}
            date={line.date.split('-').reverse().slice(0, 2).join('/')}
            description={line.description}
            value={line.value}
            way={line.way}
            openModal={onOpen}
            setIdToDelete={setIdToDelete}
          />
        ))}
      </Stack>
    );
  }
  const content = () => {
    if (loading) {
      return (
        <>
          <CardBody pos='relative' overflowY='scroll'>
            {skeletons(7)}
          </CardBody>
          <CardFooter fontWeight={700} fontSize='lg' lineHeight={7} h={16}>
            {skeletons(1)}
          </CardFooter>
        </>
      );
    }
    if (records.length !== 0) {
      return (
        <>
          <CardBody pos='relative' overflowY='scroll'>
            {dataContainer()}
          </CardBody>
          <CardFooter
            fontWeight={700}
            fontSize='lg'
            lineHeight={7}
            h={16}
            display='flex'
            justify='space-between'
          >
            Balance
            <Balance positive={balance >= 0}>
              {balance.replace('-', '')}
            </Balance>
          </CardFooter>
        </>
      );
    }
    return <Empty>No cash flow records</Empty>;
  };
  return (
    <Page>
      <Header>
        <Title pos='relative'>
          {loading ? (
            <Skeleton w={60} h={9} />
          ) : (
            `Hi, ${firstLetterToUpperCase(user.name)}`
          )}
        </Title>
        <LogoutButton
          as={RiLogoutBoxRLine}
          onClick={() => {
            logout(Date.now());
          }}
        />
      </Header>
      <Card
        color='letters'
        bgColor='secondary'
        fontFamily='body'
        maxW='max'
        w='100%'
        height='100%'
      >
        {content()}
      </Card>
      <ButtonsContainer>
        <StyledLink to='/record/in'>
          <Icon as={AiOutlinePlusCircle} w={6} h={6} color='secondary' />
          <Txt>New inflow</Txt>
        </StyledLink>
        <StyledLink to='/record/out'>
          <Icon as={AiOutlineMinusCircle} w={6} h={6} color='secondary' />
          <Txt>New outflow</Txt>
        </StyledLink>
      </ButtonsContainer>
      <MyModal
        isOpen={isOpen}
        onClose={onClose}
        setLoading={setLoading}
        deleteRecord={deleteRecord}
      />
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
const LogoutButton = styled(Icon)`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  padding: ${({ theme }) => theme.space.generalPadding};
  padding-right: 0;
  color: ${({ theme }) => theme.colors.secondary};

  & :nth-child(n) {
    cursor: pointer;
  }
`;
const ButtonsContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  padding: ${({ theme }) => theme.space.generalPadding};
  background-color: ${({ theme }) => theme.colors.lightMain};
  width: 100%;
  height: 7rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;

  & :nth-child(n) {
    cursor: pointer;
  }
  :first-child {
    margin-right: 0.5rem;
  }
`;
const Txt = styled.p`
  word-spacing: 9999rem;
  line-height: 1.2rem;
`;
const Empty = styled.div`
  margin: auto;
  color: ${({ theme }) => theme.colors.grayLetters};
  font-size: 1.25rem;
  line-height: 1.45rem;
`;
const Balance = styled.p`
  font-weight: 400;
  color: ${({ positive, theme }) =>
    positive ? theme.colors.green : theme.colors.red};
`;
