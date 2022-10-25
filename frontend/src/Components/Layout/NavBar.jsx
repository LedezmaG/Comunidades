import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import { types } from '../../Types/types';

export const NavBar = () => {

  const { dispatch } = useContext( AuthContext );
  const navigate = useNavigate()

  const handelLogout = () => {
    dispatch({
      type: types.logout,
    });
    localStorage.removeItem('token')
    navigate( "/sign-in" ) 
  }

  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div>
          <i className="fa-solid fa-magnifying-glass" />  &nbsp;
          Buscador
        </div>
        <button className='btn' onClick={handelLogout}>
          <i className="fa-solid fa-right-from-bracket"/>
        </button>
      </div>
    </nav>
  )
}
