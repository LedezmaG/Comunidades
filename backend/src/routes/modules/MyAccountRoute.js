const { Router } = require("express");
const { check } = require("express-validator");
const {
    GetById,
    Create,
    Update,
    Delete,
} = require("../../controllers/Modules/MyAccount/MyAccountController");
const { fileValidator } = require("../../helpers/fileValidator");
const { JwtVerify } = require("../../helpers/jwtVerify");
const { validatePermissions } = require("../../helpers/permissions");
const router = Router();

router.use(JwtVerify);
router.use(validatePermissions);

router.get(
    "/my-account/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    GetById
);

router.post(
    "/my-account",
    [
        check("id_role", "Invalid value").not().isEmpty().isInt(),
        check("id_avatar", "Invalid value").not().isEmpty().isInt(),
        check("first_name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 50 }),
        check("last_name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 50 }),
        check("email", "Invalid value").isString().isLength({ max: 50 }),
        fileValidator,
    ],
    Create
);

router.put(
    "/my-account",
    [
        check("id", "Invalid value").not().isEmpty().isInt(),
        check("id_role", "Invalid value").not().isEmpty().isInt(),
        check("id_avatar", "Invalid value").not().isEmpty().isInt(),
        check("first_name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("last_name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("email", "Invalid value").not().isEmpty().isEmail(),
        fileValidator,
    ],
    Update
);

router.delete(
    "/my-account/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    Delete
);

module.exports = router;
