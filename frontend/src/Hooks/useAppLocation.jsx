import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useAppLocation = () => {
    
    const location = useLocation()
    const [titlePre, setTitlePre] = useState(null)

    useEffect(() => {
        const path = location.pathname.split("/")
        
        if (path.includes("new")) {
            setTitlePre("Agregar")
        }
        if (path.includes("view")) {
            setTitlePre("")
        }
        if (path.includes("edit")) {
            setTitlePre("Editar")
        }
    }, [])
    
    return { titlePre }
}
