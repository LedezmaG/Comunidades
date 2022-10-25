import services from "../../services/Api";

export const GetSystemModules = async () => {
    try {
        const resp = await services.get("/system/module")
        let result = [];
        if (resp.status !== 200) throw new Error("Error de conexion")
        if (!resp.data.status) throw new Error("Error de servidor")

        for (const item of resp.data.response) {
            result.push({
                ...item.system_module,
                rules: {
                    read: item.read,
                    create: item.create,
                    update: item.update,
                    delete: item.delete,
                }
            })
        }
        
        return {
            status: true,
            result,
            msg: ""
        }
    } catch (error) {
        return {
            status: false,
            result: null,
            msg: error.message
        }
    }
}

export const GetSystemModuleById = async (id) => {
    try {
        const resp = await services.get(`/system/module/${id}`)
        if (resp.status !== 200) throw new Error("Error de conexion")
        if (!resp.data.status) throw new Error("Error de servidor")
        
        return {
            status: true,
            result: resp.data.response,
            msg: ""
        }
    } catch (error) {
        return {
            status: false,
            result: null,
            msg: error.message
        }
    }
}

export const GetPermissionPreRoleAndModule = async (id) => {
    try {
        const resp = await services.get(`/system/permissions/all/${id}`)
        if (resp.status !== 200) throw new Error("Error de conexion")
        if (!resp.data.status) throw new Error("Error de servidor")
        
        return {
            status: true,
            result: resp.data.response,
            msg: ""
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            result: null,
            msg: error.message
        }
    }
}