import { Icon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Login({ token, setToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BASE_URL}/transactions`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(URL, config)
      .then(({ data}) => {
        setTransactions(data.userTransactions);
        console.log(
          '🚀 ~ file: transactions.jsx ~ line 34 ~ .then ~ data.userTransactions',
          data.userTransactions
        );
        setUser(data.user);
        setLoading(false);
      })
      .catch(({ response: { data, status } }) => {
        console.log({ data, status });
        setLoading(true);
        navigate('/');
      });
  }, []);

  const handleLogout = () => {
    setToken('');
    navigate('/');
  };

  function skeletons(n) {
    const skeletonsNumber = [];
    for (let i = 0; i < n; i++) {
      skeletonsNumber.push(0);
    }
    return (
      <Stack
        divider={<StackDivider />}
        spacing='2'
        pos='absolute'
        left={5}
        right={5}
      >
        {skeletonsNumber.map((x, index) => (
          <Skeleton key={index} height={6} />
        ))}
      </Stack>
    );
  }
  function dataContainer() {
    return (
      <Stack divider={<StackDivider />} spacing='2' pos='absolute' p='0' pr='5'>
        teste
      </Stack>
    );
  }
  return (
    <Page>
      <Header>
        <Title pos='relative'>
          {loading ? (
            <Skeleton w={60} h={9} />
          ) : (
            `Hi, ${
              user.name.split(' ')[0][0].toUpperCase() +
              user.name.split(' ')[0].substring(1)
            }`
          )}
        </Title>
        <LogoutButton as={RiLogoutBoxRLine} onClick={handleLogout} />
      </Header>
      <Card
        color='letters'
        bgColor='secondary'
        fontFamily='body'
        maxW='max'
        w='100%'
        height='100%'
      >
        <CardBody pos='relative' overflowY='scroll'>
          {loading ? skeletons(7) : dataContainer()}
        </CardBody>
        <CardFooter fontWeight={700} fontSize='lg' lineHeight={7} h={16}>
          {loading ? skeletons(1) : 'Balance'}
        </CardFooter>
      </Card>
      <ButtonsContainer>
        <StyledLink to='/transaction/in'>Cash in</StyledLink>
        <StyledLink to='/transaction/out'>Cash out</StyledLink>
      </ButtonsContainer>
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

  :first-child {
    margin-right: 0.5rem;
  }
`;
