const { Router } = require('express');
const { check } = require('express-validator');
const { GetAll, GetById, Create, Update, Delete, GetByRol } = require('../../controllers/system/PermissionsController');
const { fileValidator } = require('../../helpers/fileValidator');
const { JwtVerify } = require('../../helpers/jwtVerify');
const router = Router();

router.use( JwtVerify )

router.get( 
    '/permissions/all/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    GetAll
);

router.get( 
    '/permissions/rol/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    GetByRol
);

router.get( 
    '/permissions/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    GetById
);

router.post( 
    '/permissions',
    [
        check("id_module", "Invalid value").not().isEmpty().isInt(),
        check("id_sub_module", "Invalid value").not().isEmpty().isInt(),
        check("id_role", "Invalid value").not().isEmpty().isInt(),
        check("read", "Invalid value").not().isEmpty().isBoolean(),
        check("create", "Invalid value").not().isEmpty().isBoolean(),
        check("update", "Invalid value").not().isEmpty().isBoolean(),
        check("remove", "Invalid value").not().isEmpty().isBoolean(),
        check("app", "Invalid value").not().isEmpty().isBoolean(),
        check("web", "Invalid value").not().isEmpty().isBoolean(),
        fileValidator
    ],
    Create
);

router.put( 
    '/permissions',
    [
        check("id", "Invalid value").not().isEmpty().isInt(),
        check("id_module", "Invalid value").not().isEmpty().isInt(),
        check("id_sub_module", "Invalid value").not().isEmpty().isInt(),
        check("id_role", "Invalid value").not().isEmpty().isInt(),
        check("read", "Invalid value").not().isEmpty().isBoolean(),
        check("create", "Invalid value").not().isEmpty().isBoolean(),
        check("update", "Invalid value").not().isEmpty().isBoolean(),
        check("remove", "Invalid value").not().isEmpty().isBoolean(),
        check("app", "Invalid value").not().isEmpty().isBoolean(),
        check("web", "Invalid value").not().isEmpty().isBoolean(),
        fileValidator
    ],
    Update
);

router.delete( 
    '/permissions/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    Delete
);


module.exports = router;
