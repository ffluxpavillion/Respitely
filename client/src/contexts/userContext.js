import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState('');
  useEffect(() => {
    if (!user) {
      // THIS IS THE ONLY ONE THAT FIXED IT -- ADD { withCredentials: true } TO THE GET REQUEST
      axios
        .get('http://localhost:8080/profile', { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
          console.log('GETDATA=================', data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  console.log('USERCONTEXTUSER=========', user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
