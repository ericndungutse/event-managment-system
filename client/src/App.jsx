import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useUser } from './context/UserContex';
import DashboardRoot from './features/dashboard/DashRoot';
import Events from './features/dashboard/Events';

function App() {
  const { isCheckingAuth } = useUser();

  return (
    <>
      {isCheckingAuth === true ? null : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route
            path='/dashboard'
            element={<DashboardRoot />}
          >
            <Route index element={<Events />} />

            <Route path='events' element={<Events />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
