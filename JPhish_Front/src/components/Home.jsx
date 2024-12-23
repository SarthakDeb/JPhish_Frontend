import React from 'react'
import {useGSAP } from '@gsap/react'
import gsap from 'gsap'
function Home() {
    useGSAP(()=>{
        gsap.from("#box1",{
            y:150,
            opacity:0,
            duration:2,
            delay:1
        })
        gsap.from("#box2",{
            x:-130,
            opacity:0,
            duration:2,
            delay:2.4
        })
        gsap.from("#stats",{
          y:130,
          opacity:0,
          duration:2,
          delay:2.8
      })
    })
  return (
    <>
    <div className='bg-gradient-to-r from-gray-900 to-gray-500 w-screen'>
    <div className='h-[40vh] w-screen flex felx-col gap-5' >
    <div id='box1' className='text-gray-400 font-bold font-sans text-9xl p-5'>JPhish</div>
    <div id="box2" className='text-gray-400 font-thin font-serif text-3xl p-5 mt-14'>Cybersecurity solutions made easy</div>
    </div>
    <div id='stats' className=' flex items-center justify-around w-screen h-[50vh]'>
      <div className='font-semibold text-3xl bg-opacity-80 w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Campaigns done
        <div className='text-xl p-4 font-thin'>150</div>
      </div>
      <div className='font-semibold text-3xl bg-opacity-80 w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Emails sent
      <div className='text-xl p-4 font-thin'>150</div>
      </div>
      <div className='font-semibold text-3xl bg-opacity-80 w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Training provided
      <div className='text-xl p-4 font-thin'>150</div>
      </div>
    </div>
    </div>
    </>
    
  )
}

export default Home;