import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosRequest from './useAxiosRequest';

export default function useGoogleLogin(setToken) {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [googleCredential, setGoogleCredential] = useState();
  const [[data, error, loaded], runAxios] = useAxiosRequest(
    false,
    '/google-login',
    'post',
    googleCredential
  );

  useEffect(() => {
    if (data && loaded) {
      setToken(data.data);
      const serializedToken = JSON.stringify(data.data);
      localStorage.setItem('token', serializedToken);
      navigate('/records');
    } else if (loaded) {
      console.log(error);
    }
  }, [data, error]);

  function handleCallbackResponse(response) {
    const { email, name, sub } = jwtDecode(response.credential);
    setGoogleCredential({ email, name, sub });
    runAxios(Date.now());
  }
  useEffect(() => {
    const { google } = window;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInButton'), {
      type: 'icon',
      theme: 'outline',
      size: 'large',
      shape: 'square',
    });
  });
}
