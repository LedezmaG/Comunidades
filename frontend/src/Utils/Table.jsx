import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext';
import '../Assets/Styles/Table.css'

export const Table = ({
    data,
    title,
    selectableRows,
    isActionsAllowed = true,
    onDelete
}) => {

    const location = useLocation()
    const { user } = useContext( AuthContext );
    const [columns, setColumns] = useState([])
    const [rules, setRules] = useState()
    const Options = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
    }

    useEffect(() => { loadHeaders() }, [data])
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    
    const loadHeaders = async () => {
        try {
            const { rules } = user;
            const path = location.pathname.split("/")
            const module = rules.find(i => i.system_module.link ===  `/${path[1]}` )
            setRules(module)
            
            if (data.length <= 0 ) {
                throw new Error("empy array")
            }
            const notAllowed = ["active", "createdAt", "updatedAt", "rules"]
            let col = [];
            
            for (const item of Object.keys(data[0])) {
                if (!notAllowed.includes(item)) {
                    col.push({
                        name: item.toLocaleUpperCase(),
                        selector: row => row[item],
                        sortable: true,
                    })
                }
            }

            if (isActionsAllowed) {
                col.push({
                    name: "Acciones".toUpperCase(),
                    selector: row => row.Acciones,
                    cell: row => (
                        <>
                            <div className="dropdown text-center">
                                <button className="btn " type="button" id="actionMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-ellipsis-vertical lite-color" />
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="actionMenu">
                                    { module.read && 
                                        <li>
                                            <Link to={`${location.pathname}/view/${row.id}`} className="dropdown-item lite-color">
                                                <i className="fa-sharp fa-solid fa-eye" /> &nbsp;
                                                Detalles
                                            </Link>
                                        </li>
                                    }
                                    { module.update && 
                                        <li>
                                            <Link to={`${location.pathname}/edit/${row.id}`} className="dropdown-item lite-color">
                                                <i className="fa-solid fa-pencil" /> &nbsp;
                                                Editar
                                            </Link>
                                        </li>
                                    }
                                    { (module.delete && onDelete) &&
                                        <li>
                                            <a onClick={()=>onDelete(row.id)} className="dropdown-item lite-color" >
                                                <i className="fa-solid fa-trash" /> &nbsp;
                                                Eliminar
                                            </a>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </>
                    )
                })
            }
            setColumns(col)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <div className='row'>
                <div className='col-4'>
                    { title && <h5>{title}</h5>}
                </div>
                <div className='col-8 d-flex flex-row-reverse'>
                    { rules?.import &&
                        <button className='btn btn-secondary btn-sm mx-1'>
                            <i className="fa-solid fa-file-import" /> Importar
                        </button>
                    }
                    { rules?.export &&
                        <button className='btn btn-secondary btn-sm mx-1'>
                            <i className="fa-solid fa-file-export" /> Exportar
                        </button>
                    }
                    { rules?.create &&
                        <Link to={`${location.pathname}/new`} className='btn btn-secondary btn-sm mx-1'>
                            <i className="fa-solid fa-plus" /> Agregar 
                        </Link>          
                    }
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
                selectableRows={selectableRows}
                expandableRowsComponent={ExpandedComponent}
                pagination
                paginationComponentOptions={Options}
                noDataComponent="Sin datos disponibles"
            />
        </div>
    )
}
