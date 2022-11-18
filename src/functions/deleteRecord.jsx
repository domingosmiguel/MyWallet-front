import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function deleteRecord(id, token, setLoading) {
  const navigate = useNavigate();
  setLoading(true);
  const URL = `${process.env.REACT_APP_BASE_URL}/record/delete/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .delete(URL, config)
    .then(({ data, status }) => {
      console.log({ data, status });
      setLoading(false);
    })
    .catch(({ response: { data, status } }) => {
      console.log({ data, status });
      navigate('/');
    });
}
