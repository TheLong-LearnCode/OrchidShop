
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


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainContent />} />
        <Route path='/details/:id' element={<OrchidDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/news' element={<News />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/natural' element={<Natural/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
