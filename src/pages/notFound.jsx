import { Icon } from '@chakra-ui/icons';
import { Card, Image, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import Div100vh from 'react-div-100vh';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import notFoundImage from '../assets/not-found.jpg';
import useLogout from '../hooks/useLogout';

export default function NotFound({ token, setToken }) {
  const logout = useLogout(setToken);
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate('/records');
      } else {
        navigate('/');
      }
    }, 3000);
  }, []);

  return (
    <Page>
      {token && (
        <Header>
          <LogoutButton
            as={RiLogoutBoxRLine}
            onClick={() => {
              logout(Date.now());
            }}
          />
        </Header>
      )}
      <Card
        color='letters'
        bgColor='secondary'
        fontFamily='body'
        maxW='max'
        w='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Text color='grayLetters' fontSize='3xl'>
          404 error
        </Text>
        <Text color='grayLetters' fontSize='xl'>
          page not found
        </Text>
        <Image
          src={notFoundImage}
          alt='Not Found'
          maxW='65%'
          marginBottom='3.5rem'
        />
        <Spinner color='main' marginBottom='.5rem' />
        <Text color='grayLetters'>redirecting...</Text>
      </Card>
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
  justify-content: end;
  align-items: center;
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
