import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Login() {
  const URL = `${process.env.REACT_APP_BASE_URL}/sing-in`;
  const handleLogin = () => {
    axios.post(URL);
  };
  return (
    <Page>
      <Header>
        <Title>Olá, Fulano</Title>
        <LogoutButton>tchau</LogoutButton>
      </Header>
      <Card color='letters' bgColor='secondary' fontFamily='body' maxW='max' w='100%' height='100%'>
        <CardBody pos='relative' overflowY='scroll'>
          <CardBody pos='absolute' p='0' pr='5'>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.See a detailed analysis of
                  all your business clients.See a detailed analysis of all your business clients.See
                  a detailed analysis of all your business clients.See a detailed analysis of all
                  your business clients.See a detailed analysis of all your business clients.See a
                  detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </CardBody>
        <CardFooter>Saldo</CardFooter>
      </Card>
      <ButtonsContainer>
        <StyledLink>Cash in</StyledLink>
        <StyledLink>Cash out</StyledLink>
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
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 50px;
`;
const LogoutButton = styled.div``;
const ButtonsContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.max};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  padding: ${({ theme }) => theme.space.generalPadding};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightMain};
  margin-top: 0.5rem;
  border-radius: 0.5rem;

  :first-child {
    margin-right: 0.5rem;
  }
`;
