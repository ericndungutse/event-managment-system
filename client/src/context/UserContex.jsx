import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
// import { checkAuthentication } from '../APIs/UserAPIs';

async function checkAuthentication(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/get-me`,
      config
    );

    if (response?.data && response.status === 200) {
      return response?.data;
    }
  } catch (err) {
    throw err;
  }
}

const UserContext = createContext();

function UserProvider({ children }) {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(
    function () {
      return token ? true : false;
    }
  );

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    localStorage.removeItem('selectedKey');
    setUser(null);
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        if (!token) return;
        setIsCheckingAuth(true);

        const res = await checkAuthentication(token);

        onLogin({
          ...res.data.user,
          token,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        onLogin,
        onLogout,
        isCheckingAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('Context used outside boundary.');
  return context;
};

export default UserProvider;
