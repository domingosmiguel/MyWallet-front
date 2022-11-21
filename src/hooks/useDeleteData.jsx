import { useEffect, useState } from 'react';
import useAxiosRequest from './useAxiosRequest';

export default function useDeleteData(token, setLoading) {
  const [id, setId] = useState();
  const [deleted, setDeleted] = useState();

  const [[response, error, loaded], runAxios] = useAxiosRequest(
    false,
    `/record/delete/${id}`,
    'delete',
    '',
    {
      Authorization: `Bearer ${token}`,
    }
  );

  useEffect(() => {
    if (response && loaded) {
      console.log({
        [response.data]: response.data,
        [response.status]: response.status,
      });
      setDeleted(Date.now());
    } else if (loaded) {
      console.log(error);
      setLoading(false);
    }
  }, [response, error]);

  return [runAxios, setId, deleted];
}
