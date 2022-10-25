import services from "../../services/Api";

export const GetSystemRoles = async () => {
    try {
        const resp = await services.get("/system/role");
        if (resp.status !== 200) throw new Error("Error de conexion");
        if (!resp.data.status) throw new Error("Error de servidor");

        return {
            status: true,
            result: resp.data.response,
            msg: "",
        };
    } catch (error) {
        return {
            status: false,
            result: null,
            msg: error.message,
        };
    }
};

export const GetSystemRoleById = async (id) => {
    try {
        const resp = await services.get(`/system/role/${id}`);
        let result = [];
        if (resp.status !== 200) throw new Error("Error de conexion");
        if (!resp.data.status) throw new Error("Error de servidor");

        return {
            status: true,
            result,
            msg: "",
        };
    } catch (error) {
        return {
            status: false,
            result: null,
            msg: error.message,
        };
    }
};
