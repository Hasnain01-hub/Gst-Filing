const express = require("express");
const router = express.Router();

const { verifyuser } = require("../middleware/auth.middleware");
const { register, login, getUsers } = require("../controller/auth.controller");
// require("../config/passport");

router.get("/current_user", verifyuser, getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
