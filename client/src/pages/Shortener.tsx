import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ShortenUrlPage: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('http://localhost:3000/short');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform the logic to shorten the URL (e.g., make an API request)
    // and update the 'shortenedUrl' state with the result.

    setShortenedUrl('Shortened URL goes here');
  };
  const navLinks = [
    { label: 'Logout', url: `${process.env.REACT_APP_API_URL}/logout` },
  ];

  return (
    <>
      <Navbar links={navLinks} />
        <div className="flex flex-col items-center justify-center m-48">
          <h1 className="text-3xl font-bold mb-4">Shorten a long link</h1>
          <form className="flex" onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={inputUrl}
              onChange={handleInputChange}
              placeholder="Example: https://super-long-link.com/shorten-it"
              className="border border-gray-300 rounded-l-lg px-4 py-2 w-96 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-[#0087CB] text-white font-semibold px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Shorten
            </button>
          </form>
          {shortenedUrl && (
            <div className="mt-8 w-96">
              <p className="text-base">Shortened URL:</p>
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:cursor-pointer hover:text-blue-600"
              >
                {shortenedUrl}
              </a>
            </div>
          )}
        </div>
    </>
  );
};

export default ShortenUrlPage;
