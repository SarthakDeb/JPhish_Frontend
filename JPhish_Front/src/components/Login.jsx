import React, { useState } from 'react'
import Navbar from './Navbar'
import { redirect } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        console.log('Log in successful', token);
        redirect("http://localhost:5173/home");
        props.onLogin(token.adminName || 'Admin');
        setEmail('');
        setPassword('');
        // window.location.href = 
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
    <div>
        <div className='text-white flex items-center justify-center w-screen h-screen bg-gradient-to-r from-gray-800 to-gray-500'>
            <div className=' p-4 flex flex-col items-center gap-y-5 shadow-lg'>
                <h3>Login</h3>
                <input className='p-4 bg-transparent shadow-lg' 
                placeholder='Email' 
                type='email'
                id='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></input>
                <input className='p-4 bg-transparent shadow-xl' 
                placeholder='Password' 
                type='password'
                id='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}></input>
                <button className='p-4 bg-transparent shadow-xl cursor-pointer hover:font-semibold'
                onClick={handleLogin}>Log In</button>
            </div>
        </div>
    </div>
  )
}

export default Login;