import React from "react";
import { Footer } from "../../../Components/Layout/Footer";
import { Link } from "react-router-dom";
import _logoGif from "../../../Assets/Media/icons/Logo.gif";

export const SignUp = () => {
    return (
        <div className="row main-content">
            <div className="col-5 container content-row-between auth-box">
                <div className="logo-container">
                    <img src={_logoGif} alt="" />
                </div>
                <div className="content-center">
                    <div>
                        <h1 className="my-5">Sing up</h1>
                        <p>
                            Si ya cuentas con una cuenta &nbsp;
                            <Link to="/sign-in">inicia secion</Link>
                        </p>
                    </div>
                    <form className="w-100">
                        <div className="mb-3">
                            <label for="email" className="form-label">
                                Nombres
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">
                                Apellidos
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">
                                E-mail
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="content-col-between">
                                <label for="password" className="form-label">
                                    Contraseña
                                </label>
                                <span>Mostrar</span>
                            </div>
                            <input
                                className="form-control"
                                type="text"
                                id="password"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="remember"
                            />
                            <label className="form-check-label" for="remember">
                                &nbsp; Acepto{" "}
                                <Link to="">aviso de privacidad</Link>
                            </label>
                        </div>
                        <div className="mb-3">
                            <button className="btn-app-secondary">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
            <div id="signup" className="col-7" />
        </div>
    );
};
