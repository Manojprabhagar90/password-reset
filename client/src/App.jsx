import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';

const routes = [
  {
    path: "/",
    element: <ForgotPassword />
  },
  {
    path: "/reset_password/:token",
    element: <ChangePassword />
  }
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionStatusRevalidation: true,
    v7_skipActionErrorRevalidation: true,
  }
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
        </>
  )
}

export default App
