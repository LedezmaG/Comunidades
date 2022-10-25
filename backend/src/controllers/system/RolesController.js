const RolesModel = require("../../models/system/roles/roles");
const connection = require("../../database/connection");

const GetAll = async (req, res = response) => {
    try {
        const all = await RolesModel.findAll({ where: { active: true } });
        if (!all) {
            throw new Error("Data not found");
        }
        return res.status(200).json({
            status: true,
            response: all,
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const GetById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const byId = await RolesModel.findAll({ where: { id, active: true } });
        if (!byId) {
            throw new Error("Data not found");
        }
        return res.status(200).json({
            status: true,
            response: byId,
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Create = async (req, res = response) => {
    const transaction = await connection.transaction();
    try {
        const { name, description } = req.body;
        const created = await RolesModel.create(
            {
                name,
                description,
            },
            { transaction }
        );
        await transaction.commit();
        return res.status(200).json({
            status: true,
            response: created,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Update = async (req, res = response) => {
    const transaction = await connection.transaction();
    try {
        const { id, name, description } = req.body;
        const finded = await RolesModel.findOne({
            where: {
                id,
                active: true,
            },
            transaction,
        });

        if (!finded) {
            throw new Error("Data not fonud");
        }
        await RolesModel.update(
            {
                name,
                description,
                is_active: true,
            },
            {
                where: { id },
                transaction,
            }
        );
        await transaction.commit();
        return res.status(200).json({ status: true });
    } catch (error) {
        await transaction.rollback();
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Delete = async (req, res = response) => {
    const transaction = await connection.transaction();
    try {
        const { id } = req.params;
        const fined = await RolesModel.findOne({
            where: {
                id,
                active: true,
            },
            transaction,
        });
        if (!fined) {
            throw new Error("Data not fonud");
        }
        await RolesModel.update(
            {
                active: false,
            },
            {
                where: { id },
                transaction,
            }
        );
        await transaction.commit();
        return res.status(200).json({ status: true });
    } catch (error) {
        await transaction.rollback();
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
};
