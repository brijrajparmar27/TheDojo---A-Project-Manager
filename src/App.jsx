import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'
import useAuthContext from './Hooks/ContextHooks/useAuthContext'
import useAuthState from './Hooks/useAuthState'
import Auth from './Pages/Auth/Auth'
import Create from './Pages/Create/Create'
import Dashboard from './Pages/Dashboard/Dashboard'
import Project from './Pages/Project/Project'

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
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
              <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
              <Route path="/project/:id" element={user ? <Project /> : <Navigate to="/auth" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/auth" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      }
    </>
  )
}

export default App
