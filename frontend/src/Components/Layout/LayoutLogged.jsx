import React from 'react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { Sidebar } from './Sidebar'
import '../../Assets/Styles/styles.css'

export const LayoutLogged = ({ children }) => {
    return (
        <div className="main-content d-flex">
            <Sidebar />
            <div className="content-wrapper container">
                <div>
                    <NavBar/>
                    <section className="">
                        {children}
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    )
}
