import React from 'react';
import LinkScissorLogo from '../assets/images/logo.svg';

interface NavbarProps {
  links: {
    label: string;
    url: string;
  }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className='navbar flex items-center justify-between px-6 py-6'>
      <a href="/" className='flex justify-between my-auto'>
        <img src={LinkScissorLogo} className="w-8 h-8" alt="Logo" />
        <h1 className='bold text-xl my-auto mx-4'>LinkScissors</h1>
      </a>

      <ul className="flex">
        {links.map((link, index) => (
          <li key={index}>
            <a className="navbar-link border px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]" href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;