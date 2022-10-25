import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useAppLocation } from "../../Hooks/useAppLocation";
import { FieldController } from "../../Utils/FieldController";
import {
    GetPermissionPreRoleAndModule,
    GetSystemModuleById,
} from "../../controllers/System/ModuleController";

export const ModulesDetails = () => {
    const { titlePre } = useAppLocation();
    const { id: _id } = useParams();

    const [state, setState] = useState({
        loading: false,
        error: null,
    });

    const formUserValues = {
        label: "",
        name: "",
        icon: "",
        link: "",
    };

    const userValidation = Yup.object({
        label: Yup.string()
            .max(15, "Debe de tener 15 caracteres o menos")
            .required("Campo requerido"),
        name: Yup.string()
            .max(15, "Debe de tener 15 caracteres o menos")
            .required("Campo requerido"),
        icon: Yup.string()
            .max(15, "Debe de tener 15 caracteres o menos")
            .required("Campo requerido"),
        link: Yup.string()
            .max(15, "Debe de tener 15 caracteres o menos")
            .required("Campo requerido"),
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        onLoadData();
    }, []);

    const onLoadData = async () => {
        let permisionsByRol = [];
        setState({ ...state, loading: true });
        if (!_id) {
            return (
                setState({ ...state, loading: false }),
                setData({
                    label: "",
                    name: "",
                    icon: "",
                    link: "",
                })
            );
        }

        const moduleData = await GetSystemModuleById(_id);
        // const permissionPreRole = await GetPermissionPreRoleAndModule(_id);
        const permissionPreRole = { result: [] };

        for (const item of permissionPreRole.result) {
            permisionsByRol.push({
                [`roleId_${item.system_role.id}`]: item.system_role.id,
                [`roleName_${item.system_role.id}`]: item.system_role.name,
                [`read_${item.system_role.id}`]: true,
                [`create_${item.system_role.id}`]: item.create,
                [`update_${item.system_role.id}`]: item.update,
                [`delete_${item.system_role.id}`]: item.delete,
                [`import_${item.system_role.id}`]: item.import,
                [`export_${item.system_role.id}`]: item.export,
                [`web_${item.system_role.id}`]: item.web,
                [`movil_${item.system_role.id}`]: item.movil,
            });
        }

        setState({ ...state, loading: false });

        setData({
            label: moduleData.result.system_module.label,
            name: moduleData.result.system_module.name,
            icon: moduleData.result.system_module.icon,
            link: moduleData.result.system_module.link,
            permisionsByRol,
        });
    };

    const handelSaveData = () => {};

    return (
        <>
            <div className="box p-3 my-3">
                <h5>{titlePre} Modulo</h5>
                {state.loading ? (
                    <span>Cargando...</span>
                ) : (
                    <Formik
                        initialValues={data}
                        validationSchema={userValidation}
                        onSubmit={(values) => handelSaveData(values)}
                    >
                        {() => (
                            <Form className="row">
                                <div className="mb-3 col-6 col-md-3">
                                    <FieldController
                                        type="text"
                                        label="Etiqueta"
                                        name="label"
                                    />
                                </div>
                                <div className="mb-3 col-6 col-md-3">
                                    <FieldController
                                        type="text"
                                        label="Nombre de modulo"
                                        name="name"
                                    />
                                </div>
                                <div className="mb-3 col-6 col-md-3">
                                    <FieldController
                                        type="text"
                                        label="Icono"
                                        name="icon"
                                    />
                                </div>
                                <div className="mb-3 col-6 col-md-3">
                                    <FieldController
                                        type="text"
                                        label="Link"
                                        name="link"
                                    />
                                </div>
                                <h5>Permisos</h5>
                                <div className="px-3">
                                    {data?.permisionsByRol?.map(
                                        (item, index) => (
                                            <div
                                                className="row-placeholder mb-3"
                                                key={index}
                                            >
                                                <h6>
                                                    {
                                                        item[
                                                            `roleName_${
                                                                index + 1
                                                            }`
                                                        ]
                                                    }
                                                </h6>
                                                <div className="content-col-between">
                                                    <FieldController
                                                        type="switch"
                                                        label="Leer"
                                                        name={`read_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Crear"
                                                        name={`create_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Editar"
                                                        name={`update_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Eliminar"
                                                        name={`delete_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Importar"
                                                        name={`import_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Exportar"
                                                        name={`export_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Acceso web"
                                                        name={`web_${
                                                            index + 1
                                                        }`}
                                                    />
                                                    <FieldController
                                                        type="switch"
                                                        label="Acceso movil"
                                                        name={`movil_${
                                                            index + 1
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="mb-3 col-12">
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-secondary"
                                    >
                                        <i className="fa-solid fa-floppy-disk" />{" "}
                                        Guardar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </>
    );
};
