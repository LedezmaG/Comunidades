const UsersModel = require('../../../models/catalog/users');
const connection = require('../../../database/connection');

const GetById = async ( req, res = response ) => {
    try {
        const {id} = req.params;
        const byId = await UsersModel.findOne({where:{ id, active: true }})
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
        const { id_role, id_avatar, first_name, last_name, email } = req.body
        const created = await UsersModel.create(
            {
                id_role, 
                id_avatar, 
                first_name, 
                last_name, 
                email
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
        const { id, id_role, id_avatar, first_name, last_name, email } = req.body
        const fined = await UsersModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })

        if (!fined) {
            throw new Error("Data not fonud")
        }
        await UsersModel.update(
            {
                id_role, 
                id_avatar, 
                first_name, 
                last_name, 
                email 
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
        const fined = await UsersModel.findOne({
            where: { 
                id,
                active: true
            },
            transaction,
        })
        if (!fined) {
            throw new Error("Data not fonud")
        }
        await UsersModel.update(
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
    GetById,
    Create,
    Update,
    Delete
}
