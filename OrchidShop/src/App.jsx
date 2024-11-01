
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import MainContent from './components/MainContent'
import OrchidDetails from './components/OrchidDetails'
import Contact from './components/Contact'
import News from './components/News'
import AboutUs from './components/AboutUs'
import Natural from './components/Natural'
import { useContext } from 'react'
import { ThemeContext } from './components/ThemeContext'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './route/ProtectedRoute.jsx'
import Profile from './components/Profile.jsx'



function App() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  return (
    <AuthProvider>
      <div style={{ backgroundColor: theme.backgroundColor }}>
        <Header />
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/details/:id' element={<OrchidDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/news' element={<News />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/natural' element={<Natural />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
