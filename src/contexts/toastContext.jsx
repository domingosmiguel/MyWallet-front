import { useToast } from '@chakra-ui/react';
import { createContext } from 'react';

const toastContext = createContext(null);

export default toastContext;

export function ToastProvider({ children }) {
  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'error',
    variant: 'solid',
  });

  return (
    <toastContext.Provider value={toast}>{children}</toastContext.Provider>
  );
}
