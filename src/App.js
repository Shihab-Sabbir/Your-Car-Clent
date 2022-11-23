import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AuthContext } from './UserContext/UserContext';

function App() {
  const { dark, setDark } = useContext(AuthContext);

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('smile-theme'));
    if (isDark !== null) {
      setDark(isDark);
    }
  }, []);

  return (
    <div className={dark ? 'dark' : ''} data-theme={dark ? 'dark' : ''}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App;