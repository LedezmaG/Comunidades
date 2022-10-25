const { Router } = require("express");
const { check } = require("express-validator");
const {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
} = require("../../controllers/system/RolesController");
const { fileValidator } = require("../../helpers/fileValidator");
const { JwtVerify } = require("../../helpers/jwtVerify");
const { validatePermissions } = require("../../helpers/permissions");
const router = Router();

router.use(JwtVerify);
router.use(validatePermissions);

router.get("/role", GetAll);
router.get(
    "/role/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    GetById
);
router.post(
    "/role",
    [
        check("name", "Invalid value").isString().isLength({ max: 20 }),
        check("description", "Invalid value").isString().isLength({ max: 50 }),
        fileValidator,
    ],
    Create
);
router.put(
    "/role",
    [
        check("id", "Invalid value").isInt(),
        check("name", "Invalid value").isString().isLength({ max: 20 }),
        check("description", "Invalid value").isString().isLength({ max: 50 }),
        fileValidator,
    ],
    Update
);
router.delete(
    "/role/:id",
    [check("id", "id no es valido").isInt(), fileValidator],
    Delete
);

module.exports = router;
