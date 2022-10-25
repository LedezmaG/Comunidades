const { DataTypes } = require('sequelize')
const Connection = require('../../../database/connection');
const ModulesModel = require('./Module');

const SubModuleModel = Connection.define('system_sub_modules', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_module: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
})

// SubModuleModel.hasOne(ModulesModel, {
//     foreignKey: 'id',
//     sourceKey: 'id_module',
//     constraints: false,
// })


module.exports = SubModuleModel;
