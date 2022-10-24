const { Router } = require('express');
const { check } = require('express-validator');
const { GetAll, GetById, Create, Update, Delete } = require('../../controllers/system/ModuleController');
const { fileValidator } = require('../../helpers/fileValidator');
const { JwtVerify } = require('../../helpers/jwtVerify');
const { validatePermissions } = require('../../helpers/permissions');
const router = Router();

router.use( JwtVerify )

router.get( '/module', GetAll );

router.get( 
    '/module/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    GetById
);

router.post( 
    '/module',
    [
        check("name", "Invalid value").not().isEmpty().isString().isLength({max: 20}),
        check("label", "Invalid value").not().isEmpty().isString().isLength({max: 20}),
        check("link", "Invalid value").not().isEmpty().isString().isLength({max: 15}),
        check("icon", "Invalid value").isString().isLength({max: 15}),
        fileValidator
    ],
    Create
);

router.put( 
    '/module',
    [
        check("id", "Invalid value").not().isEmpty().isInt(),
        check("name", "Invalid value").not().isEmpty().isString().isLength({max: 20}),
        check("label", "Invalid value").not().isEmpty().isString().isLength({max: 20}),
        check("link", "Invalid value").not().isEmpty().isString().isLength({max: 15}),
        check("icon", "Invalid value").isString().isLength({max: 15}),
        fileValidator
    ],
    Update
);

router.get( 
    '/module/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    Delete
);

module.exports = router;
