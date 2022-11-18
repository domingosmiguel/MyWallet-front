import axios from 'axios';

export default function deleteRecord(id, token, setLoading) {
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
    });
}
