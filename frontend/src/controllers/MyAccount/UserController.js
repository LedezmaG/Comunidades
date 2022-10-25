import services from "../../services/Api";

export const GetAccountInfo = async (id) => {
    try {
        const resp = await services.get(`/api/my-account/${id}`);
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
