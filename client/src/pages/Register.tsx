import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";

import { register } from "../services/auth";
import { store } from "../redux/store";
import LinkScissorLogo from '../assets/images/logo.svg';


export default function Register() {
    const [redirect, setRedirect] = useState(false);
    const logged_in =  store.getState().logged_in;

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required(" full name is requied field"),
            email: Yup.string()
                .required("email is requied field")
                .email("please enter correct email"),
            password: Yup.string()
                .required("password is required")
                .min(6, "password must be of 6 characters")
        }),
        onSubmit: async (values) => {
            try {
                const res = await register(values);
                if (!res.status) return;

                setRedirect(true);
            } catch (error) {
                console.log(error)
            }

        }
    })
    if (logged_in) return <Navigate to="/shortner" />

    if (redirect) return <Navigate to="/shortner" />;


    const { values, errors, submitForm, isSubmitting, handleChange } = formik;

    return (
        <>
            <div className="conatiner flex flex-col w-screen h-screen ">
                <section className="m-auto text-center md:w-96 max-w-2xl">
                <a href="/" className='flex justify-center my-6'>
                        <img src={LinkScissorLogo} className="w-24 h-24" alt="Logo" />
                    </a>

                    <h2> Create your LinkScissors account</h2>
                    <p className="font-thin">
                        Best link shortner at your fingertip
                    </p>

                    <div className="flex flex-col my-8">
                        <label htmlFor="name" className="form-label" >Full Name</label>
                        <input
                            placeholder="name"
                            name="name"
                            className="form-input"
                            onChange={handleChange}
                            value={values.name}
                        />

                        <label htmlFor="email" className="form-label" >Email</label>
                        <input
                            placeholder="email"
                            name="email"
                            className="form-input"
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <label htmlFor="password" className="form-label" >Password</label>
                        <input
                            value={values.password}
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="password"
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}

                        <button
                            className="button my-4"
                            onClick={() => {
                                submitForm();
                            }}
                        >
                            {isSubmitting ? "loading..." : "Submit"}
                        </button>
                    </div>

                    <p className="text-slate-400 font-light py-2 text-base">Already have an account? <Link to="/login" className="underline text-blue-900 hover:text-slate-400"> Sign in</Link></p>

                </section>

            </div>
        </>
    )
}