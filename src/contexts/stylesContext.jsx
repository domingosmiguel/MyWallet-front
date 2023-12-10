import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import Styles from '../styles/Styles';
import GlobalStyles from '../styles/globalStyles';

export default function StylesProvider({ children }) {
  const theme = extendTheme(Styles);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={Styles}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ThemeProvider>
    </>
  );
}
