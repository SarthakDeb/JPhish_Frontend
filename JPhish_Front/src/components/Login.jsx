import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:9000/admin/adlog',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
        credentials: 'include',
      });
      if(response.ok){
        const token = await response.text();
        localStorage.setItem('Token', token);
        console.log('Log in successful', token);
        setAuthInfo(token, 'Admin')
        navigate('/home');
        props.onLogin(token.adminName || 'Admin');
        setEmail('');
        setPassword('');
      }
      else{
        alert('Log in unsuccessful');
        setEmail('');
        setPassword('');
      } 
    } catch (error){
      console.log('Error has happened', error)
      setEmail('');
      setPassword('');
    }
  };
  return (
      <div className="w-screen h-screen bg-gradient-to-r from-gray-800 to-gray-500 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold text-white mb-8 tracking-widest">
        Welcome Back!
      </h1>
      <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-lg shadow-lg flex flex-col items-center gap-6 w-[400px] min-w-[250px]">
        <h3 className="text-2xl font-bold text-white">Login</h3>
        <input
          className="p-3 rounded w-full bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-blue-400 transition-all"
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-3 rounded w-full bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-blue-400 transition-all"
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow-md transition-all"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  )
}

export default Login;