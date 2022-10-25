import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { LayoutLogged } from '../Components/Layout/LayoutLogged'

export const PrivateRoute = ({ isAuth, component: Component}) => {
  return (
    (isAuth) 
      ? <LayoutLogged>
        <Component />
      </LayoutLogged>
      : <Navigate to="/sign-in" />
  )
}

PrivateRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
