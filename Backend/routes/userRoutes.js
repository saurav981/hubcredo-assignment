const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

// protect all routes under this
router.use(authController.protect);
router.post("/logout", authController.logout);
router.get("/check-auth", authController.checkAuth);

module.exports = router;
