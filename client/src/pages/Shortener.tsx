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
        { label: 'Logout', url: '/logout' },
      ];

  return (
    <>   
     <Navbar links={navLinks}/>
    </>
  );
};

export default Shortner;