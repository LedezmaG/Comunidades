const connection = require('../../database/connection');
const ModulesModel = require('../../models/system/modules/module');
const PremissionsModel = require('../../models/system/modules/permissions');

const GetAll = async ( req, res = response ) => {
    try {
        const { auth_user } = req

        const all = await PremissionsModel.findAll({
            where:{ 
                id_role: auth_user.role,
                active: true,
            },
            include: [{ model: ModulesModel }],
        })

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
        const byId = await PremissionsModel.findOne({
            where:{ 
                id_module: id,
                active: true,
            },
            include: [{ model: ModulesModel }],
        })
        if (!byId) {
            throw new Error("Data not found")
        }
        return res.status(200).json({
            status: true,
            response: byId
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({status: false, messaje: error.message})
    }
}

const Create = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { name, label, link, icon } = req.body
        const created = await ModulesModel.create(
            {
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
        const { id, name, label, link, icon } = req.body
        const fined = await ModulesModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })

        if (!fined) {
            throw new Error("Data not fonud")
        }
        await ModulesModel.update(
            {
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
        const fined = await ModulesModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })
        if (!fined) {
            throw new Error("Data not fonud")
        }
        await ModulesModel.update(
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
