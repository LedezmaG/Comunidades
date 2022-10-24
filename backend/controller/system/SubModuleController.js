const connection = require('../../database/connection');
const SubModuleModel = require('../../models/system/modules/subModule');

const GetAll = async ( req, res = response ) => {
    try {
        const all = await SubModuleModel.findAll({where:{ active: true }})
        if (!all) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: all
        })
    } catch (error) {
        return res.status(400).json({status: false, messaje: error.message})
    }
}

const GetById = async ( req, res = response ) => {
    try {
        const {id} = req.params;
        const byId = await SubModuleModel.findAll({where:{ id, active: true }})
        if (!byId) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: byId
        })
    } catch (error) {
        return res.status(400).json({status: false, messaje: error.message})
    }
}

const Create = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id_module, name, label, link, icon } = req.body
        const created = await SubModuleModel.create(
            {
                id_module,
                name,
                label,
                link,
                icon
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
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

const Update = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id_module, id, name, label, link, icon } = req.body
        const fined = await SubModuleModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })

        if (!fined) {
            throw new Error("Data not fonud")
        }
        await SubModuleModel.update(
            {
                id_module,
                name,
                label,
                link,
                icon
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
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

const Delete = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id } = req.params;
        const fined = await SubModuleModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })
        if (!fined) {
            throw new Error("Data not fonud")
        }
        await SubModuleModel.update(
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
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}
