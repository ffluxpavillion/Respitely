import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const ApiKeyContext = createContext();

export default function ApiKeyProvider({ children }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/maps-key`);
        setApiKey(response.data.key);
      } catch (error) {
        console.error('Error fetching API key', error);
      }
    }

    fetchApiKey();
  }, [])

  return (
    <ApiKeyContext.Provider value={apiKey}>
      {children}
    </ApiKeyContext.Provider>
  )
}

export { ApiKeyContext };