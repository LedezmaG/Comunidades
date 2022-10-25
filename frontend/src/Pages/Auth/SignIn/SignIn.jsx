import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../Auth/AuthContext";
import { Footer } from "../../../Components/Layout/Footer";
import { types } from "../../../Types/types";
import { FieldController } from "../../../Utils/FieldController";

import _logoGif from "../../../Assets/Media/icons/Logo.gif";
import { appLogin } from "../../../controllers/System/AuthController";

export const SignIn = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const resp = await appLogin(values);
        if (!resp.status) {
            return console.log("Error");
        }
        localStorage.setItem("token", resp.result.token);
        dispatch({
            type: types.login,
            payload: {
                logged: true,
                ...resp.result,
            },
        });
        return navigate("/dashboard");
    };

    const formValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const validation = Yup.object({
        email: Yup.string()
            .email("El correo no tiene un formato válido")
            .required("Campo requerido"),
        password: Yup.string()
            .max(15, "Debe de tener 15 caracteres o menos")
            .min(8, "Debe de tener por lo menos 8 caracteres")
            .required("Campo requerido"),
        rememberMe: Yup.boolean(),
    });

    return (
        <div className="row main-content">
            <div className="col-5 col-md-8 container content-row-between auth-box">
                <div className="logo-container">
                    <img src={_logoGif} alt="" />
                </div>
                <div className="content-center">
                    <div>
                        <h1 className="my-5">Log in</h1>
                        <p>
                            ¿Aun no tienes una cuenta? &nbsp;
                            <Link to="/sign-up">Crear una cuenta</Link>
                        </p>
                    </div>
                    <div className="w-100">
                        <Formik
                            initialValues={formValues}
                            validationSchema={validation}
                            onSubmit={(values) => handleLogin(values)}
                        >
                            {() => (
                                <Form>
                                    <div className="mb-3">
                                        <FieldController
                                            type="text"
                                            label="Email"
                                            name="email"
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FieldController
                                            type="password"
                                            label="Contraseña"
                                            name="password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FieldController
                                            type="checkbox"
                                            label="Mantenerme logueado"
                                            name="rememberMe"
                                            id="rememberMe"
                                        />
                                    </div>
                                    <div className="mb-3 d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-lg"
                                        >
                                            Log in
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <Footer />
            </div>
            <div id="signin" className="col-7 col-md-4" />
        </div>
    );
};
