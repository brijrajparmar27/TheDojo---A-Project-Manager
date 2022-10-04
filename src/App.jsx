import './App.css'
import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
const Header = React.lazy(() => import('./Components/Header/Header'))
const Navbar = React.lazy(() => import('./Components/Navbar/Navbar'))
const Sidebar = React.lazy(() => import('./Components/Sidebar/Sidebar'))
import useAuthContext from './Hooks/ContextHooks/useAuthContext'
import useAuthState from './Hooks/useAuthState'
const Auth = React.lazy(() => import('./Pages/Auth/Auth'))
const Create = React.lazy(() => import('./Pages/Create/Create'))
const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'))
const Project = React.lazy(() => import('./Pages/Project/Project'))

function App() {
  const { user, AuthIsReady } = useAuthContext();
  const { AuthStateListener } = useAuthState();

  useEffect(() => {
    AuthStateListener();
  }, [])

  return (
    <>
      {AuthIsReady && <div className="App">
        <BrowserRouter>
          {user && <Navbar />}
          <div className="main_content">
            {user && <Header />}
            <AnimatePresence mode='wait'>
              <Suspense fallback={<div></div>}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
                  <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
                  <Route path="/project/:id" element={user ? <Project /> : <Navigate to="/auth" />} />
                  <Route path="/create" element={user ? <Create /> : <Navigate to="/auth" />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </div>
          {user && <Sidebar />}
        </BrowserRouter>
      </div>
      }
    </>
  )
}

export default App
