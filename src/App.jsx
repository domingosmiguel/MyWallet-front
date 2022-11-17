import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import EditTransaction from './pages/editTransaction';
import Login from './pages/login';
import NewTransaction from './pages/newTransaction';
import Registration from './pages/registration';
import Transactions from './pages/transactions';
import GlobalStyles from './styles/globalStyles';
import Styles from './styles/Styles';

function App() {
  const [token, setToken] = useState('');
  const theme = extendTheme(Styles);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={Styles}>
          <Routes>
            <Route path='/' element={<Login setToken={setToken} />} exact />
            <Route path='/register' element={<Registration token={token} />} />
            <Route
              path='/transactions'
              element={<Transactions token={token} setToken={setToken} />}
            />
            <Route
              path='/transaction/:way'
              element={<NewTransaction token={token} />}
            />
            <Route
              path='/transaction/:id'
              element={<EditTransaction token={token} />}
            />
          </Routes>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
