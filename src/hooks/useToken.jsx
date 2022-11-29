import { useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState(null);

  if (token === null) {
    const serializedToken = localStorage.getItem('token');

    if (serializedToken !== null) {
      const oldToken = JSON.parse(serializedToken);
      setToken(oldToken);
    }
  }
  return { token, setToken };
}
