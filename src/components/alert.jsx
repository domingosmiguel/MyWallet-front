import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props) => {
  const { status } = props;

  const successBase = status === 'success' && {
    container: {
      background: 'green',
    },
  };

  const warningBase = status === 'warning' && {
    container: {
      background: 'orange',
    },
  };

  const errorBase = status === 'error' && {
    container: {
      background: 'red',
    },
  };

  const infoBase = status === 'info' && {
    container: {
      background: 'blue',
    },
  };

  return {
    ...successBase,
    ...warningBase,
    ...errorBase,
    ...infoBase,
  };
});

export const alertTheme = defineMultiStyleConfig({ baseStyle });
