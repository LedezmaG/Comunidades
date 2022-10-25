import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { LayoutUnlogged } from "../Components/Layout/LayoutUnlogged";

export const PublicRoute = ({ isAuth, component: Component }) => {
    return !isAuth ? (
        <LayoutUnlogged>
            <Component />
        </LayoutUnlogged>
    ) : (
        <Navigate to="/dashboard" />
    );
};

PublicRoute.prototype = {
    isAuth: PropTypes.bool.isRequired,
    userType: PropTypes.number.isRequired,
    component: PropTypes.func.isRequired,
};
