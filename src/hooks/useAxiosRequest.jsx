import axios from 'axios';
import { useEffect, useState } from 'react';
import useFirstRender from './useFirstRender';

export default function useAxiosRequest(
  runOnFirstRender,
  url,
  method,
  payload,
  headers
) {
  const firstRender = useFirstRender();

  const [runAxios, setRunAxios] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (runOnFirstRender || !firstRender()) {
      (async () => {
        try {
          const response = await axios.request({
            baseURL,
            url,
            method,
            data: payload,
            headers,
          });
          setData(response);
        } catch (error) {
          setError(error);
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [runAxios]);
  return [[data, error, loaded], setRunAxios];
}
