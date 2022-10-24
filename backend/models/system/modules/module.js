const { DataTypes } = require('sequelize')
const Connection = require('../../../database/connection');
const PremissionsModel = require('./permissions');
const SubModuleModel = require('./subModule');

const ModulesModel = Connection.define('system_modules', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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


module.exports = ModulesModel;