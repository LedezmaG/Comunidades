import React, { useEffect, useState } from 'react'
import { GetSystemRoles } from '../../controllers/System/RolesController'
import { useAppLocation } from '../../Hooks/useAppLocation'
import { Table } from '../../Utils/Table'

export const Roles = () => {
    
    const [data, setData] = useState([])
    useEffect(() => { onLoadData() }, [])
    
    const onLoadData = async () => {
        const roles = await GetSystemRoles()
        if (!roles.status) {
            return console.log("error");
        }
    
        setData( roles.result );
    }

    const handelDelete = ( id ) => {
        console.log("Delete ", id);
    }

    return (
        <>
        <div className='box p-3 my-3'>
            <div>
            { data.length > 0 
                ? <Table 
                    data={data}
                    title="Roles"
                    canCreate
                    onDelete={handelDelete}
                />
                : <div>
                    Sin informacion
                </div>
            }
            </div>
        </div>
        </>
    )
}

