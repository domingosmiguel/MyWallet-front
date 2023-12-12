import { extendTheme } from '@chakra-ui/react';
import { alertTheme } from '../components/alert';

const Styles = {
  colors: {
    darkMain: '#6f0d96',
    main: '#8c11be',
    lightMain: '#af29e8',
    secondary: '#fff',
    letters: '#000',
    grayLetters: '#868686',
    lightLetters: '#c6c6c6',
    green: '#03ac00',
    red: '#c70000',
    orange: '#eaba0e',
    blue: '#1275d2',
  },
  fonts: {
    body: "'Raleway', sans-serif",
    logo: "'Saira Stencil One', cursive",
  },
  sizes: {
    max: '28rem',
  },
  space: {
    generalPadding: '0.5rem',
  },
};

const theme = extendTheme({
  ...Styles,
  components: { Alert: alertTheme },
});

export { Styles, theme };
