import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/login';
import NewTransaction from './pages/newTransaction';
import Registration from './pages/registration';
import Transactions from './pages/transactions';
import GlobalStyles from './styles/globalStyles';
import Styles from './styles/Styles';

function App() {
  const theme = extendTheme(Styles);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        {/* <ChakraProvider> */}
        <ThemeProvider theme={Styles}>
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/register' element={<Registration />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/transaction/:way' element={<NewTransaction />} />
            {/* <Route path='/transaction/:id' element={}/> */}
          </Routes>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
