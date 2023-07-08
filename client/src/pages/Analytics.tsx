import React from 'react';
import Navbar from '../components/Navbar';

interface NavbarProps {
  title: string;
  links: {
    label: string;
    url: string;
  }[];
}

const Shortner = () => {
    const navLinks = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Sign Up', url: '/sigin-up' },
      ];

  return (
    <>   
     <Navbar/>
    </>
  );
};

export default Shortner;