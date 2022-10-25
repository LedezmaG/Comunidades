const { Router } = require("express");
const { check } = require("express-validator");
const {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
} = require("../../controllers/system/SubModuleController");
const { fileValidator } = require("../../helpers/fileValidator");
const { JwtVerify } = require("../../helpers/jwtVerify");
const router = Router();

router.use(JwtVerify);

router.get("/submodule", GetAll);

router.get(
    "/submodule/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    GetById
);

router.post(
    "/submodule",
    [
        check("id_module", "Invalid value").not().isEmpty().isInt(),
        check("name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("label", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("link", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 15 }),
        check("icon", "Invalid value").isString().isLength({ max: 15 }),
        fileValidator,
    ],
    Create
);

router.put(
    "/submodule",
    [
        check("id", "Invalid value").not().isEmpty().isInt(),
        check("id_module", "Invalid value").not().isEmpty().isInt(),
        check("name", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("label", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 20 }),
        check("link", "Invalid value")
            .not()
            .isEmpty()
            .isString()
            .isLength({ max: 15 }),
        check("icon", "Invalid value").isString().isLength({ max: 15 }),
        fileValidator,
    ],
    Update
);

router.get(
    "/submodule/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    Delete
);

module.exports = router;
