const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest, notAdmin } = require("../middleware/auth");
const userController = require("../Controllers/userController");
const requestController = require("../Controllers/requestController");

router.get("/profile-page", ensureAuth, notAdmin, userController.getUser);
router.get("/update-form", ensureAuth, notAdmin, userController.getUpdateForm);
router.post("/updateMe", ensureAuth, notAdmin, userController.updateMe);

module.exports = router;
