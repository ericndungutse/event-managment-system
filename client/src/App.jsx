import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useUser } from './context/UserContex';
import DashboardRoot from './features/dashboard/DashRoot';
import Events from './features/dashboard/Events';
import Bookings from './features/dashboard/Bookings';

function App() {
  const { isCheckingAuth, user } = useUser();

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
            {user?.role && user?.role === 'admin' ? (
              <Route index element={<Events />} />
            ) : (
              <Route index element={<Bookings />} />
            )}

            <Route path='events' element={<Events />} />
            <Route path='bookings' element={<Bookings />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
