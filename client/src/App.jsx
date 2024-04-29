import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useUser } from './context/UserContex';
import DashboardRoot from './features/dashboard/DashRoot';
import Events from './features/dashboard/Events';
import Bookings from './features/dashboard/Bookings';
import EventPage from './pages/EventPage';
import Protect from './components/Protect';
import LoadingSpinner from './components/LoadingSpinner';
import SignUp from './pages/Signup';
import BookingDetails from './features/dashboard/BookingDetails';

function App() {
  const { isCheckingAuth, user } = useUser();

  return (
    <>
      {isCheckingAuth ? (
        <div className='h-screen flex justify-center items-center'>
          <LoadingSpinner />
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/events/:id'
            element={<EventPage />}
          />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/dashboard'
            element={
              <Protect>
                <DashboardRoot />
              </Protect>
            }
          >
            {user?.role && user?.role === 'admin' ? (
              <Route index element={<Events />} />
            ) : (
              <Route index element={<Bookings />} />
            )}

            <Route path='events' element={<Events />} />
            <Route path='bookings' element={<Bookings />} />
            <Route
              path='bookings/:id'
              element={<BookingDetails />}
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
