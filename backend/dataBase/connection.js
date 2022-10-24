const { Sequelize } = require("sequelize")

const connection = new Sequelize(
"mysql://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST +
    "/" +
    process.env.DB_NAME
)

module.exports = connection
