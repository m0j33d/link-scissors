import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { resetPassword } from "../services/auth";
import LinkScissorLogo from '../assets/images/logo.svg';


export default function ResetPassword() {
    const [redirect, setRedirect] = useState(false);
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token") ?? ''

    const formik = useFormik({
        initialValues: {
            password: "",
            password_confirmation: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("password is required")
                .min(6, "password must be of 6 characters"),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref("password"), undefined], "Passwords must match")
                .required("Field required")
        }),
        onSubmit: async (values) => {
            const data = { ...values, token };

            const res = await resetPassword(data);

            if (!res?.data) return;

            setRedirect(true);

        }
    })

    if (redirect) return <Navigate to="/login" />;


    const { values, errors, submitForm, isSubmitting, handleChange } = formik;

    return (
        <>
            <div className="flex flex-col w-screen h-screen ">
                <section className="m-auto text-center md:w-96 max-w-2xl">
                    <a href="/" className='flex justify-center my-6'>
                        <img src={LinkScissorLogo} className="w-24 h-24" alt="Logo" />
                    </a>
                    <h2> Create a new password</h2>


                    <div className="flex flex-col my-8">

                        <label htmlFor="password" className="form-label" >Password</label>
                        <input
                            placeholder="password"
                            name="password"
                            type="password"
                            className="form-input"
                            onChange={handleChange}
                            value={values.password}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}

                        <label htmlFor="password_confirmation" className="form-label" >Password confirmation</label>
                        <input
                            placeholder="type password again"
                            name="password_confirmation"
                            type="password"
                            className="form-input"
                            onChange={handleChange}
                            value={values.password_confirmation}
                        />
                        {errors.password_confirmation && <span className="error">{errors.password_confirmation}</span>}

                        <button
                            className="button  my-4"
                            onClick={() => {
                                submitForm();
                            }}
                        >
                            {isSubmitting ? "loading..." : "Change password"}
                        </button>
                    </div>

                </section>

            </div>
        </>
    )
}