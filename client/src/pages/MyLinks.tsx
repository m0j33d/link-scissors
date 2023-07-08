import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import QRCodeViewer from '../components/QRCodeViewer';
import { getLinks } from '../services/shortner';
import { getQRcode } from '../services/shortner';

const MyLinks = ({ logged_in, user }: { logged_in: boolean, user: any }) => {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [generateCode, setGeneratedCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLinks({ user_id: user._id });
        setShortenedLinks(response)

      } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const handleQRcodeGenerate = async (url: string) => {
    const res = await getQRcode({ url });
    setGeneratedCode(res?.data?.url)
  }
  if (!logged_in) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto">

        <h1 className="text-2xl font-bold my-8">URL Links</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Original Link</th>
              <th className="py-2 px-4 border-b">Short Link</th>
              <th className="py-2 px-4 border-b">Clicks</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!shortenedLinks.length && shortenedLinks.map((item: any) => (
              <tr key={item?.id}>
                <td className="py-2 px-4 border-b text-center">
                  <a className="text-blue-500 hover:underline" href={item.full_url} target='_blank'>{item.full_url}</a>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a className="text-blue-500 hover:underline" href={item.short_url} target='_blank'>{item.short_url} </a>
                </td>
                <td className="py-2 px-4 border-b text-center">{item.clicks}</td>
                <td className="py-2 px-4 border-b text-center">
                  {generateCode && <QRCodeViewer data={generateCode} />}

                  {!generateCode &&  <button
                    onClick={() => handleQRcodeGenerate(item.short_url)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Generate QR Code
                  </button>}
                 
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {!shortenedLinks.length && <div className='w-full text-center my-12 '> You have no shortened links</div>}

      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    logged_in: state.logged_in,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MyLinks);