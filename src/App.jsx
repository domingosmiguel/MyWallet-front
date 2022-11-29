import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useToken from './hooks/useToken';
import EditRecord from './pages/editRecord';
import Login from './pages/login';
import NewRecord from './pages/newRecord';
import Records from './pages/records/records';
import UserRegistration from './pages/userRegistration';
import GlobalStyles from './styles/globalStyles';
import Styles from './styles/Styles';

function App() {
  const { token, setToken } = useToken();
  const theme = extendTheme(Styles);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={Styles}>
          <Routes>
            <Route
              path='/'
              element={<Login token={token} setToken={setToken} />}
              exact
            />
            <Route
              path='/register'
              element={<UserRegistration token={token} />}
            />
            <Route
              path='/records'
              element={<Records token={token} setToken={setToken} />}
            />
            <Route path='/record/:way' element={<NewRecord token={token} />} />
            <Route
              path='/record/edit/:id'
              element={<EditRecord token={token} />}
            />
          </Routes>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
