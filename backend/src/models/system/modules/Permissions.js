const { DataTypes } = require("sequelize");
const Connection = require("../../../database/connection");

const ModulesModel = require("./Module");
const SubModuleModel = require("./SubModule");
const RolesModel = require("../roles/roles");

const PremissionsModel = Connection.define("system_module_permission", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_module: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_sub_module: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    create: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    export: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    import: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    app: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    web: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

PremissionsModel.hasOne(RolesModel, {
    foreignKey: "id",
    sourceKey: "id_role",
    constraints: false,
});
PremissionsModel.hasOne(ModulesModel, {
    foreignKey: "id",
    sourceKey: "id_module",
    constraints: false,
});
PremissionsModel.hasOne(SubModuleModel, {
    foreignKey: "id",
    sourceKey: "id_sub_module",
    constraints: false,
});

module.exports = PremissionsModel;
