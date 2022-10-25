import services from "../../services/Api"

export const appLogin = async (values) => {
    try {
        const resp = await services.post("/auth/sign-in", { ...values })
        if (resp.status !== 200) throw new Error("Error de conexion")
        if (!resp.data.status) throw new Error("Error de servidor")
        
        const user = await tokenDecrypt(resp.data.token)
        if (!user.status) throw new Error("Error de validacion de token")
        
        const rules = await getRulesByRole(user.result.role)
        if (!rules.status) throw new Error("Error al solicitar permisos de usuario")
        
        return {
            status: true,
            result: {
                token: resp.data.token,
                info: user,
                rules
            },
            msg: ""
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            result: null,
            msg: error.message
        }
    }
}

export const tokenDecrypt = async (token) => {
    try {
        const resp = await services.post("/auth/token-decrypt", { token })
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

export const getRulesByRole = async (rolId) => {
    try {
        const resp = await services.get(`/auth/permissions/${rolId}`)
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