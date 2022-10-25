import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import _logo from '../../Assets/Media/icons/LogoWhite.png'
import { AuthContext } from '../../Auth/AuthContext';

export const Sidebar = () => {

    const { user } = useContext( AuthContext );

    return (
        <div id='nav'>
            <nav className='w-100'>
                <div className='nav-header'>
                    <div className='logo-container'>
                        <Link to="/dashboard">
                            <img src={_logo} alt="" />
                        </Link>
                    </div>
                    <div className=''>
                        <hr />
                        { user.info.avatar 
                            ? <img src="" alt="" className='nav-items-icon' />
                            : <i className="fa-solid fa-user nav-items-icon"></i>
                        }
                        <Link to="/my-account" className='txt_c-black'>
                            Hola <b>{user.info.name}!</b>
                        </Link>
                        <hr />
                    </div>
                </div>
                <ul className='nav-items'>
                    { user?.rules?.map(item => {
                        if (item.system_module.label === "Mi cuenta") return
                        if (item.system_module) {
                            return <li className='item' key={item.id}>
                                <Link to={item.system_module.link}> 
                                    <i className={`fa-regular ${item.system_module.icon} nav-items-icon`}></i>
                                    <span>{item.system_module.label}</span>
                                </Link>
                            </li>
                        }
                        if (item.system_sub_module) {
                            return <>
                                <li className='item' key={item.id}>
                                    <a className='nav-items-menu' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" > 
                                        <div>
                                            <i className="fa-regular fa-user nav-items-icon"></i>
                                            <span>Nombre</span>
                                        </div>
                                        <div className='nav-arrow'>
                                            <i className="fa-solid fa-chevron-right" />
                                        </div>
                                    </a>
                                </li>
                                <li className="collapse" id="collapseExample">
                                    <ul className='nav-items'>
                                        <li className='item-sm'>
                                            <Link to="">
                                                <i className="nav-items-icon" />
                                                <span>Nombre</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        }
                    })}
                </ul>
            </nav>
        </div>
    )
}
