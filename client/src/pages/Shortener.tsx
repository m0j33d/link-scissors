import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import QRCodeViewer from '../components/QRCodeViewer';
import { useFormik } from "formik";
import * as Yup from "yup";
import { short, getQRcode } from '../services/shortner';

const ShortenUrlPage = ({ logged_in, user }: { logged_in: boolean, user: any }) => {
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [generateCode, setGeneratedCode] = useState(null);


  const formik = useFormik({
    initialValues: {
      url: "",
      custom_alias: "",
      user_id: user?._id
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .url('Invalid URL')
        .required('URL is required'),
      custom_alias: Yup.string(),
      user_id: Yup.string().required()
    }),
    onSubmit: async (values) => {
      try {
        const res = await short(values);

        const { short_url } = res?.data;

        setShortenedUrl(short_url)
        setGeneratedCode(null)

      } catch (e) {
        console.log(e)
      }
    }
  })

  if (!logged_in) {
    return <Navigate to="/login" />;
  }

  const { values, errors, submitForm, isSubmitting, handleChange } = formik;

  const handleQRcodeGenerate = async () => {
    const res = await getQRcode({ url: shortenedUrl });

    setGeneratedCode(res?.data?.url)
  }


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center m-48">
        <h1 className="text-3xl font-bold mb-4">Shorten a long link</h1>
        <div className="flex">
          <input
            name="url"
            type="text"
            value={values.url}
            onChange={handleChange}
            placeholder="Example: https://super-long-link.com/shorten-it"
            className="border border-gray-300 rounded-l-lg px-4 py-2 w-96 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={() => {
              submitForm();
            }}
            className="bg-[#0087CB] text-white font-semibold px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
            {isSubmitting ? "loading..." : "Shorten"}

          </button>

        </div>
        {errors.url && <span className="error">{errors.url}</span>}


        {shortenedUrl && (
          <div className="mt-8 w-96 flex flex-col">
            <p className="text-base">Here is scissored url:</p>
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 py-4 underline hover:cursor-pointer hover:text-blue-600"
            >
              {shortenedUrl}
            </a>

            <button onClick={handleQRcodeGenerate} className='py-2 px-4 bg-[#0087CB] text-white rounded'> Generate QR code</button>
          </div>
        )}

        {generateCode && <QRCodeViewer data={generateCode} />}
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

export default connect(mapStateToProps)(ShortenUrlPage);