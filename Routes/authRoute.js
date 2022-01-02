const { Router } = require("express");
const authController = require("../Controllers/authController.js");
const { requireAuth, checkUser, requireAdmin } = require('../midllewares/authMidlleware')
const router = Router();

router.post("/api/signup", authController.signup);
router.post("/api/login", authController.login);
router.get("/api/logout", authController.logout);
router.get("/api/admin", requireAdmin, authController.admin);

module.exports = router;
