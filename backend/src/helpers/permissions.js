const PermissionsModel = require("../models/system/modules/permissions");
const SubModuleModel = require("../models/system/modules/subModule");
const ModulesModel = require("../models/system/modules/module");

const validatePermissions = async (req, res, next) => {
    try {
        const { url, method, auth_user } = req;

        const rules = await PermissionsModel.findAll({
            where: {
                id_role: auth_user.role,
                active: true,
            },
        });
        if (rules.length == 0) {
            throw new Error("Access forbidden");
        }

        for (const item of rules) {
            if (item.id_module) {
                const isModule = await ModulesModel.findOne({
                    where: {
                        id: item.id_module,
                        active: true,
                    },
                });
                if (isModule == 0) {
                    throw new Error("Access forbidden");
                }
                // if (isModule.link.includes(url)) {
                //     throw new Error("Access forbidden 2")
                // }
                if (method == "GET" && !item.read) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "POST" && !item.create) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "PUT" && !item.update) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "DELETE" && !item.delete) {
                    throw new Error("Access forbidden, wrong method");
                }
            }
            if (item.id_sub_module) {
                const IsSubModule = await SubModuleModel.findOne({
                    where: {
                        id: item.id_sub_module,
                        active: true,
                    },
                });
                if (IsSubModule == 0) {
                    throw new Error("Access forbidden");
                }
                if (IsSubModule.link != url) {
                    throw new Error("Access forbidden");
                }
                if (method == "GET" && !item.read) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "POST" && !item.create) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "PUT" && !item.update) {
                    throw new Error("Access forbidden, wrong method");
                }
                if (method == "DELETE" && !item.delete) {
                    throw new Error("Access forbidden, wrong method");
                }
            }
        }

        next();
    } catch (error) {
        return res.status(401).json({ status: false, messaje: error.message });
    }
};

module.exports = {
    validatePermissions,
};
