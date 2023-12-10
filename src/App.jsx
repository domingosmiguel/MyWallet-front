import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './hooks/useToken';
import EditRecord from './pages/editRecord';
import Login from './pages/login';
import NewRecord from './pages/newRecord';
import NotFound from './pages/notFound';
import Records from './pages/records/records';
import UserRegistration from './pages/userRegistration';

function App() {
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login token={token} setToken={setToken} />} />
        <Route path='/register' element={<UserRegistration token={token} />} />
        <Route
          path='/records'
          element={<Records token={token} setToken={setToken} />}
        />
        <Route path='/record/:way' element={<NewRecord token={token} />} />
        <Route path='/record/edit/:id' element={<EditRecord token={token} />} />
        <Route
          path='*'
          element={<NotFound token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
