const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const connection = require('../../database/connection');
// ROUTES
const rolesRoute = require('../../routes/system/rolesRoute');
const modulesRoute = require('../../routes/system/modulesRoute');
const subModulesRoute = require('../../routes/system/subModulesRoute');
const permissionsRoute = require('../../routes/system/permissionsRoute');
const AuthRoute = require('../../routes/auth/AuthRoute');
const MyAccountRoute = require('../../routes/modules/MyAccountRoute');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4051;
        this.middleware();
        this.routes();
        this.dbConect();
    }

    async dbConect() {
        connection
        .sync({ alter: true })
        .then(() => console.log("Database online") )
        .catch((error) => {
            console.log("Database error:" + error)
            throw new Error("Database conction error")
        })
    }

    middleware() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( bodyParser.json() );
        this.app.use( bodyParser.urlencoded({ extended: true }) );
        // this.app.use( validatePermissions );
    }

    routes() {
        this.app.use( '/system', rolesRoute );
        this.app.use( '/system', modulesRoute );
        this.app.use( '/system', subModulesRoute );
        this.app.use( '/system', permissionsRoute );
    
        this.app.use( '/auth', AuthRoute );
        this.app.use( '/api', MyAccountRoute );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server online, PORT running: ' + this.port );
        })
    }
}
module.exports = Server;
