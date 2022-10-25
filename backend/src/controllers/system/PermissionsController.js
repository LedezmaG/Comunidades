const connection = require('../../database/connection');
const ModulesModel = require('../../models/system/modules/module');
const PermissionsModel = require('../../models/system/modules/permissions');
const RolesModel = require('../../models/system/roles/roles');

const GetAll = async ( req, res = response ) => {
    try {
        const {id} = req.params;
        const all = await PermissionsModel.findAll({
            where:{ 
                id_module: id,
                active: true,
            },
            include: [{ model: RolesModel }],
        })
        if (!all) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: all
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const GetById = async ( req, res = response ) => {
    try {
        const {id} = req.params;
        const byId = await PermissionsModel.findAll({
            where:{ 
                id_role: id,
                active: true,
            },
            include: [{ model: ModulesModel }],
        })
        // for (const item of byId) {
        //     if (item.id_module) {
        //         const isModule = await ModulesModel.findOne({
        //             where:{ 
        //                 id: item.id_module,
        //                 active: true 
        //             }
        //         })
        //         console.log(item);
        //         result.push( "hola",
        //         item,
        //             // ...item,
        //             // isModule
        //         )
        //     }
        //     if (item.id_sub_module) {
        //         const IsSubModule = await SubModuleModel.findOne({
        //             where:{ 
        //                 id: item.id_sub_module,
        //                 active: true 
        //             }
        //         })
                
        //     }
        // }

        if (!byId) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: byId
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const GetByRol = async ( req, res = response ) => {
    try {
        const {id} = req.params;
        const byRole = await PermissionsModel.findAll({
            where:{ 
                id_role: id,
                active: true,
            },
            include: [{ model: ModulesModel }],
        })

        if (!byRole) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: byRole
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

const Create = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id_module, id_sub_module, id_role, read, create, update, remove, app, web } = req.body
        const created = await PermissionsModel.create(
            {
                id_module,
                id_sub_module,
                id_role,
                read,
                create,
                update,
                delete: remove,
                app,
                web
            },
            { transaction }
        )
        await transaction.commit()
        return res.status(200).json({
            status: true,
            response: created
        })
    } catch (error) {
        await transaction.rollback()
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
} 

const Update = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id, id_module, id_sub_module, id_role, read, create, update, remove, app, web } = req.body
        const fined = await PermissionsModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })

        if (!fined) {
            throw new Error("Data not fonud")
        }
        await PermissionsModel.update(
            {
                id_module,
                id_sub_module,
                id_role,
                read,
                create,
                update,
                delete: remove,
                app,
                web
            },
            { 
                where: { id },
                transaction 
            }
        )
        await transaction.commit()
        return res.status(200).json({status: true})
    } catch (error) {
        await transaction.rollback()
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
} 

const Delete = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id } = req.params;
        const fined = await PermissionsModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })
        if (!fined) {
            throw new Error("Data not fonud")
        }
        await PermissionsModel.update(
            {
                active: false,
            },
            { 
                where: { id },
                transaction 
            }
        )
        await transaction.commit()
        return res.status(200).json({status: true})
    } catch (error) {
        await transaction.rollback()
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
} 

module.exports = {
    GetAll,
    GetById,
    GetByRol,
    Create,
    Update,
    Delete
}
