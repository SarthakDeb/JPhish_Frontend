import React, { useEffect, useRef } from 'react';
import DoughnutChart from './DoughnutChart';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import Articles from './Articles';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const analyticsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Use fromTo to keep the elements hidden until the animation renders them
    tl.fromTo("#box1", 
      { y: 150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.3 }
    )
    .fromTo("#box2", 
      { x: -130, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.3 }
    )
    .fromTo("#stats", 
      { y: 130, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.3 }
    );

    const elements = analyticsRef.current.querySelectorAll('.chart-wrapper');

    gsap.fromTo(elements, {
      x: -100,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: analyticsRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  const data = {
    labels: ['Only clicked', 'Data shared', 'Ignored'],
    datasets: [
      {
        label: '# of users',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            family: 'Helvetica',
            size: 12,
          },
        },
      },
    },
  };

  const fontStyle = {
    fontFamily: "Helvetica"
  };

  return (
    <>
    <div className='bg-gradient-to-r from-gray-900 to-gray-500 w-screen'>
      <div className='h-[40vh] w-screen flex gap-5'>
        <div id='box1' style={fontStyle} className='text-gray-400 font-bold font-sans text-9xl p-5'>JPhish</div>
        <div id="box2" style={fontStyle} className='text-gray-400 font-thin font-serif text-3xl p-5 mt-14'>Cybersecurity solutions made easy</div>
      </div>
      <div id='stats' className='flex items-center justify-around w-screen h-[50vh]'>
        <div style={fontStyle} className='bg-gray-700 rounded-md font-semibold text-3xl w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Campaigns done
          <div className='text-2xl p-4 font-thin'>150</div>
        </div>
        <div className='bg-gray-700 rounded-md font-semibold text-3xl w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Emails sent
          <div className='text-2xl p-4 font-thin'>150</div>
        </div>
        <div className='bg-gray-700 rounded-md font-semibold text-3xl w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Training provided
          <div className='text-2xl p-4 font-thin'>150</div>
        </div>
        <div className='bg-gray-700 rounded-md font-semibold text-3xl w-[300px] h-[150px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>Registered Users
          <div className='text-2xl p-4 font-thin'>150</div>
        </div>
      </div>
      <h2 className='p-5 ml-2 font-extrabold text-4xl text-white'>&#9614; Campaign Analytics</h2>
      <div id='analytics' ref={analyticsRef} className='flex items-center justify-around w-screen h-[50vh] p-5'>
        <div className='bg-gray-700 rounded-lg chart-wrapper font-semibold font-serif text-2xl bg-opacity-80 w-[300px] h-[300px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>
          <div style={fontStyle}>Test0 Campaign</div>
          <DoughnutChart data={data} options={options} />
        </div>
        <div className='bg-gray-700 rounded-lg chart-wrapper font-semibold text-2xl bg-opacity-80 w-[300px] h-[300px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>
          <div>Coupon Redeem</div>
          <DoughnutChart data={data} options={options} />
        </div>
        <div className='bg-gray-700 rounded-lg chart-wrapper font-semibold text-2xl bg-opacity-80 w-[300px] h-[300px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>
          <div>Reset Password</div>
          <DoughnutChart data={data} options={options} />
        </div>
        <div className='bg-gray-700 rounded-lg chart-wrapper font-semibold text-2xl bg-opacity-80 w-[300px] h-[300px] shadow-md p-5 m-5 flex flex-col items-center justify-center text-gray-300'>
          <div>Facebook login</div>
          <DoughnutChart data={data} options={options} />
        </div>
      </div>
      <Articles />
    <footer className="flex flex-col items-center justify-center bg-gray-800 p-5 text-white gap-2">
      <div className='flex justify-between gap-4'>
  <a
    href="https://github.com"
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
  >
    <FaGithub size={24} />
    <span className="text-xs mt-1">GitHub</span>
  </a>
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
  >
    <FaLinkedin size={24} />
    <span className="text-xs mt-1">LinkedIn</span>
  </a>
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
  >
    <FaTwitter size={24} />
    <span className="text-xs mt-1">Twitter</span>
  </a>
  <a
    href="https://discord.com"
    target="_blank"
    rel="noreferrer"
    className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
  >
    <FaDiscord size={24} />
    <span className="text-xs mt-1">Discord</span>
  </a></div>
  <div className='font-thin font-mono text-sm'>© 2025 JPhish. All rights reserved.</div>
</footer>
</div>
    </>
  );
};

export default Home;