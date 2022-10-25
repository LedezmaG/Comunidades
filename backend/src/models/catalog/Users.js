const { DataTypes } = require('sequelize')
const Connection = require('../../database/connection');
const RolesModel = require('../system/roles/roles');

const UsersModel = Connection.define('catalog_users', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_avatar: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
})

UsersModel.hasOne(RolesModel, {
    foreignKey: 'id',
    sourceKey: 'id_role',
    constraints: false,
})

module.exports = UsersModel;