import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import UserGroups from './components/UserGroupPage.jsx'
import {Routes, Route} from 'react-router-dom'
import SendingProfiles from './components/SendingProfile.jsx'
import Resources from './components/Resources.jsx'
import Home from './components/Home.jsx'


function App() {
  const[loginStatus, setLoginStatus] = useState('');
  const onLogin = (name)=>{
    setLoginStatus(name)
  }
  return (
    <>
    <Navbar loginStatus={loginStatus}/>
    <Routes>
      <Route path='/' element={<Login  onLogin={onLogin}/>}/>
      <Route path='/usergroups' element={<UserGroups />} />
      <Route path='/sendingprofile' element={<SendingProfiles />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/home' element={<Home/>} />
    </Routes>
    
    </>
    
    
  )
}

export default App
