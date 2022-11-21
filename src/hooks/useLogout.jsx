import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFirstRender from './useFirstRender';

export default function useLogout(setToken) {
  const firstRender = useFirstRender();

  const navigate = useNavigate();
  const [logout, setLogout] = useState(null);

  useEffect(() => {
    if (!firstRender()) {
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
    }
  }, [logout]);

  return setLogout;
}
