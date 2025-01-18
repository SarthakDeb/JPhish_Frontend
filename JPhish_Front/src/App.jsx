import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import UserGroups from './components/UserGroupPage.jsx'
import {Routes, Route, useLocation} from 'react-router-dom'
import SendingProfiles from './components/SendingProfile.jsx'
import Resources from './components/Resources.jsx'
import Home from './components/Home.jsx'
import Campaign from './components/Campaign.jsx'


function App() {
  const[loginStatus, setLoginStatus] = useState('');

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [jwtToken, setToken] = useState(null);
  const location = useLocation();

  const onLogin = (name)=>{
    setLoginStatus(name)
  }
  return (
    <>
      {location.pathname !== '/' && <Navbar loginStatus={loginStatus} />}
      <Routes>
        <Route path='/' element={<Login  onLogin={onLogin} getToken={(token)=> setToken(token)}/>}/>
        <Route path='/usergroups' element={<UserGroups onSelectGroup={(grp) => setSelectedGroup(grp)}/>} />
        <Route path='/sendingprofile' element={<SendingProfiles onSelectProfile={(prof) => setSelectedProfile(prof)}/>} />
        <Route path='/resources' element={<Resources onSelectResource={(res) => setSelectedResource(res)} />} />
        <Route path='/campaign' element={<Campaign
                selectedToken={jwtToken}
                selectedGroup={selectedGroup}
                selectedProfile={selectedProfile}
                selectedResource={selectedResource}/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    
    </>
    
    
  )
}

export default App
