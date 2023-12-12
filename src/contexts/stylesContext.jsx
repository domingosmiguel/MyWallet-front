import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import { Styles, theme } from '../styles/Styles';
import GlobalStyles from '../styles/globalStyles';

export default function StylesProvider({ children }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={Styles}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ThemeProvider>
    </>
  );
}
