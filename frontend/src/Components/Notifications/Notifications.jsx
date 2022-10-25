import React, { useEffect, useState } from 'react'
import { GetSystemModules } from '../../controllers/System/ModuleController'
import { Table } from '../../Utils/Table'

export const Notifications = () => {

    const [data, setData] = useState([])

    useEffect(() => { onLoadData() }, [])
    
    const onLoadData = async () => {
        const resp = await GetSystemModules();
        if (!resp.status) {
        return console.log("error");
        }

        setData( resp.result );
    }

    const handelDelete = ( id ) => {
        console.log("Delete ", id);
    }

    return (
        <>
            <div className='box p-3 my-3'>
                <div>
                { data.length > 0 &&
                    <Table 
                        data={data}
                        title="Historial de notificaciones"
                        canCreate
                        onDelete={handelDelete}
                    />
                }
                </div>
            </div>
        </>
    )
}
