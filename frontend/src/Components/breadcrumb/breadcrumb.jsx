import React from 'react'
import { Link } from 'react-router-dom'

export const breadcrumb = ({path}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                
                <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Library
                </li>
            </ol>
        </nav>
    )
}
