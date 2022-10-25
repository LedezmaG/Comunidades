import React, {  useState, useEffect, useContext } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../Auth/AuthContext'

import _avatar01 from '../../Assets/Media/Images/Avatar01.png'
import _avatar02 from '../../Assets/Media/Images/Avatar02.png'
import { FieldController } from '../../Utils/FieldController'
import { GetAccountInfo } from '../../controllers/MyAccount/UserController'

export const MyAccount = () => {

    const { user } = useContext( AuthContext );
    const [data, setData] = useState()
    const [state, setState] = useState({
        loading: true,
        error: null
    })
    const [userValues, setUserValues] = useState({
        name: '',
        lastName: '',
        email: '',
        role: ''
    })

    useEffect(() => { handelLoadData() }, [])


    const userValidation = Yup.object({
        name: Yup.string()
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        lastName: Yup.string()
            .max(15, 'Debe de tener 15 caracteres o menos')
            .required('Campo requerido'),
        email: Yup.string()
            .email('El correo no tiene un formato válido')
            .required('Campo requerido'),
        role: Yup.string()
            .required('Campo requerido'),
    })

    const formPassValues = {
        current: '',
        new: '',
        confirm: ''
    }

    const passValidation = Yup.object({
        current: Yup.string()
            .required('Campo requerido'),
        new: Yup.string()
            .min(8, '8 caracteres como mínimo')
            .max(25, '25 caracteres máximo')
            // .minLowercase(1, 'Un carácter en minúscula')
            // .minUppercase(1, 'Un carácter en mayúscula')
            // .minNumbers(1, 'Un número')
            // .minSymbols(1, 'Un carácter especial')
            .required('Campo requerido'),
        confirm: Yup.string()
            .oneOf([Yup.ref('new'), null], 'Contraseñas debe de coincidir')
            .required('Campo requerido'),
    })

    const handelLoadData = async () => {
        setState({...state, loading: true})
        const resp = await GetAccountInfo(user.info.id);
        if (!resp.status) {
            return console.log(resp.msg);
        }

        setUserValues({
            name: resp.result.first_name,
            lastName: resp.result.last_name,
            email: resp.result.email,
            role: resp.result.system_role.name
        })

        setData(resp.result)
        setState({...state, loading: false})
    }

    const handelEditData = (data) => {
        console.log(data);
    }

    const handelChangePassword = (data) => {

    }

    if (state.loading) {
        return (
            <div>
                Cargando...
            </div>
        )
    }
    return (
        <>
            <div className='box p-3 my-3'>
                <div>
                    <h5>Foto de perfil</h5>
                    <div className='d-flex'>
                        <img src={ _avatar02 } alt="Imagen de perfil" className='img-md' />
                        <div className='content-row-between'>
                            <div>
                                <button className='btn btn-primary'>Subir nueva foto</button>
                                <button className='btn btn-gosth'>Resetear</button>
                            </div>
                            <p className='txt_c-grey '>Allowed JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <h5>Faccionamiemto</h5>
                    <div className="mb-3 col-12 col-md-4">
                        <span>Nombre:</span><br />
                        <span>${}</span>
                    </div>
                    <div className="mb-3 col-12 col-md-4">
                        <span>Hogar:</span><br />
                        <span>${}</span>
                    </div>
                    <div className="mb-3 col-12 col-md-2">
                        <span>Numero Interior:</span><br />
                        <span>${}</span>
                    </div>
                    <div className="mb-3 col-12 col-md-2">
                        <span>Numero Exterior:</span><br />
                        <span>${}</span>
                    </div>
                </div>
                <hr />
                <Formik
                    initialValues={userValues}
                    validationSchema={userValidation}
                    onSubmit={(values)=>handelEditData(values)}
                    
                >
                    { () => (
                        <Form className='row'>
                            <h5>Datos personales</h5>
                            <div className="mb-3 col-12 col-md-6">
                                <FieldController 
                                    type="text"
                                    label="Nombre"
                                    name="name" 
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <FieldController 
                                    type="text"
                                    label="Apellido"
                                    name="lastName" 
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <FieldController 
                                    type="email"
                                    label="Email"
                                    name="email" 
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <FieldController 
                                    type="text"
                                    label="Rol"
                                    name="role"
                                    readonly
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-4">
                                <button type='submit' className='btn btn-secondary' >
                                    Actualizar
                                </button>    
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='box p-3 my-3'>
                <h5 className=''>Cambiar contraseña</h5>
                <Formik
                    initialValues={formPassValues}
                    validationSchema={passValidation}
                    onSubmit={(values)=>handelChangePassword(values)}
                >
                    { () => (
                        <Form className='row'>
                            <div className="mb-3 col-12 col-md-12">
                                <FieldController 
                                    type="password"
                                    label="Contraseña actual"
                                    name="current" 
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-12">
                                <FieldController 
                                    type="password"
                                    label="Contraseña nueva"
                                    name="new" 
                                />
                                <div className='row'>
                                    <div className='col-4'>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> 8 caracteres como mínimo</span>
                                        </div>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> 25 caracteres máximo</span>
                                        </div>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> Un carácter en minúscula</span>
                                        </div>
                                        
                                    </div>
                                    <div className='col-4'>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> Un carácter en mayúscula</span>
                                        </div>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> Un número</span>
                                        </div>
                                        <div>
                                            <span className="badge rounded bg-secondary"> </span>
                                            <span> Un carácter especial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 col-12 col-md-12">
                                <FieldController 
                                    type="password"
                                    label="Verificar contraseña"
                                    name="confirm" 
                                />
                            </div>
                            <div className="mb-3 col-12 col-md-4">
                                <button type='submit' className='btn btn-secondary' >
                                    Actualizar
                                </button>    
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
