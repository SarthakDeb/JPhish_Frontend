import React from 'react'
import {Link} from 'react-router-dom'


function Navbar(props) {
  return (
    <div className='w-screen flex justify-between bg-black text-slate-300'>
        <div className='p-5 font-semibold font-mono text-2xl'>JPhish&#8482;</div>
        <div className='mr-8'>
            <ul className='font-semibold font-serif p-7 flex items-center justify-between gap-8 '>
                <li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/home'}> Home </Link></li>
                <li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/usergroups'}> User Group </Link></li>
                <li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/resources'}> Resources </Link></li>
                <li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/sendingprofile'}> Sending Profile </Link></li>
                <li className='hover:text-cyan-300 cursor-pointer'>Domain Finder</li>
                <li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/campaign'}> Campaign </Link></li>
                {props.loginStatus ? (<li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/'}> 
                  {props.loginStatus}&#128075;
                  </Link></li>):(<li className='hover:text-cyan-300 cursor-pointer'>
                  <Link to={'/'}> 
                  LogIn
                  </Link></li>)}                
            </ul>
        </div>
    </div>
  )
}

export default Navbar;