const { Router } = require("express");
const authController = require("../Controllers/authController.js");
const { requireAuth, checkUser, requireAdmin } = require('../midllewares/authMidlleware')
const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/admin", requireAdmin, authController.admin);

module.exports = router;
