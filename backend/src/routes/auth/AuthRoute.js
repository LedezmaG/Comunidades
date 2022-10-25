const { Router } = require('express');
const { check } = require('express-validator');
const { SignInController, SignUpController, JwtDecodeController } = require('../../controllers/auth/AuthController');
const { GetByRol } = require('../../controllers/system/PermissionsController');
const { fileValidator } = require('../../helpers/fileValidator');
const router = Router();

router.get( 
    '/permissions/:id',
    [
        check("id", "id no es valido").isInt(),
        fileValidator
    ],
    GetByRol
);

router.post( '/sign-in', SignInController );
router.post( '/sign-up', SignUpController );
router.post( '/token-decrypt', JwtDecodeController );
router.post( '/PasswordRecovery', SignInController );

module.exports = router;
