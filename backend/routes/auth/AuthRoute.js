const { Router } = require('express');
const { SignInController, SignUpController, JwtDecodeController } = require('../../controllers/auth/AuthController');
const router = Router();

router.post( '/sign-in', SignInController );
router.post( '/sign-up', SignUpController );
router.post( '/token-decrypt', JwtDecodeController );
router.post( '/PasswordRecovery', SignInController );

module.exports = router;
