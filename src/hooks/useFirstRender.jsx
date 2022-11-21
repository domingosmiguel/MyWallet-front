import { useRef, useEffect } from 'react';

export default function useFirstRender() {
  const mountRef = useRef();
  mountRef.current = false;

  useEffect(() => {
    mountRef.current = true;
  }, []);

  return () => mountRef.current;
}
