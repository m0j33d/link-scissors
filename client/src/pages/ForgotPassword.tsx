import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { forgotPassword } from "../services/auth";
import LinkScissorLogo from '../assets/images/logo.svg';



export default function ForgotPassword() {
    const [redirect, setRedirect] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("email is requied field")
                .email("please enter correct email"),
        }),
        onSubmit: async (values) => {
            const res = await forgotPassword(values);

            if (!res?.data)  return;
            
            setRedirect(true);   

        }
    })

    if (redirect) return <Navigate to="/sign-in" />;


    const { values, errors, submitForm, isSubmitting, handleChange } = formik;

    return (
        <>
            <div className="conatiner flex flex-col w-screen h-screen ">
                <section className="m-auto text-center md:w-96 max-w-2xl">
                    <a href="/" className='flex justify-center my-6'>
                        <img src={LinkScissorLogo} className="w-24 h-24" alt="Logo" />
                    </a>

                    <h2> Retrieve your LinkScissor account</h2>
                    <p className="font-thin">
                        Best link shortner at your fingertip
                    </p>

                    <div className="flex flex-col my-8">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input
                            placeholder="email"
                            name="email"
                            className="form-input"
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                       
                        <button
                            className="button  my-4"
                            onClick={() => {
                                submitForm();
                            }}
                        >
                            {isSubmitting ? "loading..." : "Submit"}
                        </button>
                    </div>

                </section>

            </div>
        </>
    )
}