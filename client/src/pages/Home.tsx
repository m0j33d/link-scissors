import React from 'react';
import Navbar from '../components/Navbar';
import illustartion from '../assets/images/illustration.gif'

const Home = () => {
  const authLink = `${process.env.REACT_APP_API_URL}/login`;
  const navLinks = [
    { label: 'Login', url: authLink },
    { label: 'Sign Up', url: authLink },
  ];

  return (
    <>
      <Navbar links={navLinks} />

      <div className='flex w-screen h-full'>
        <section className='w-1/2 my-auto mx-12'>
          <h1 className='text-6xl font-extrabold py-2 leading-tight'> Shrink, Track and Share Your Links </h1>
          <p className='text-xl py-4 pr-24 font-light leading-snug'>
            Shorten web links with our URL shortening services, so you can share the link more easily.
            We'll also create a QR code for each shortened link and provide analytics for your campaign.
          </p>

          <div className='my-8'>
            <a href={authLink} className='bg-[#0087CB] px-6 py-4 my-4 hover:bg-[#3757c0] rounded-full text-white'>
              Get Started for free
            </a>
          </div>
        </section>
        <section className='w-1/2 m-auto p-18 pr-24'>
          <img src={illustartion} alt="Illustration" />
        </section>
      </div>

    </>
  );
};

export default Home;