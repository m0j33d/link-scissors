import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import QRCodeViewer from '../components/QRCodeViewer';
import { getLinks } from '../services/shortner';
import { getQRcode } from '../services/shortner';
import { ThreeDots } from "react-loader-spinner"


const MyLinks = ({ logged_in, user }: { logged_in: boolean, user: any }) => {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [generateCode, setGeneratedCode] = useState(null);
  const [selectedLink, setSelectedLink] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLinks({ user_id: user?._id });
        setIsLoading(false)
        setShortenedLinks(response)

      } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [user?._id]);

  const handleQRcodeGenerate = async (url: string) => {
    const res = await getQRcode({ url });
    setSelectedLink(url);
    setGeneratedCode(res?.data?.url)
  }
  if (!logged_in) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />

      <h1 className="text-xl md:text-2xl font-bold text-center md:mx-16 md:text-left my-6 md:my-8">URL Links</h1>

      <div className="overflow-x-auto">

        <table className="w-full table-auto">
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
              <tr key={item?.short_url}>
                <td className="py-2 px-4 border-b text-center">
                  <a className="text-blue-500 hover:underline text-xs md:text-base" rel="noreferrer" href={item.full_url} target='_blank'>{item.full_url}</a>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a className="text-blue-500 hover:underline text-xs md:text-base" rel="noreferrer" href={item.short_url} target='_blank'>{item.short_url} </a>
                </td>
                <td className="py-2 px-4 border-b text-center text-xs md:text-base">{item.clicks}</td>
                <td className="py-2 px-4 border-b text-center">
                  {generateCode && selectedLink === item.short_url ? <QRCodeViewer data={generateCode} /> : <button

                    onClick={() => handleQRcodeGenerate(item.short_url)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-xs md:text-base"
                  >
                    Generate QR Code
                  </button>}

                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {isLoading && !shortenedLinks.length && <section className='w-screen my-32 flex justify-center'>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#015BB5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </section>
        }

        {!isLoading && !shortenedLinks.length && <div className='w-full text-center my-12 '> You have no shortened links</div>}

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