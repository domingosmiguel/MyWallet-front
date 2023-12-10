import { useColorModeValue, useToast } from '@chakra-ui/react';
import { createContext } from 'react';

const toastContext = createContext(null);

export default toastContext;

export function ToastProvider({ children }) {
  const toastVariant = useColorModeValue('solid', 'solid');

  const toast = useToast({
    position: 'top-right',
    variant: toastVariant,
    isClosable: true,
  });

  return (
    <toastContext.Provider value={toast}>{children}</toastContext.Provider>
  );
}
