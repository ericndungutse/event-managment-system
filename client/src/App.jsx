import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useUser } from './context/UserContex';

function App() {
  const { isCheckingAuth } = useUser();

  return (
    <>
      {isCheckingAuth === true ? (
        <h1 className='text-3xl bg-red-500 h-full'>
          Wait.........
        </h1>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
