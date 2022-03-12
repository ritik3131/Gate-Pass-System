const express = require("express");
const router = express.Router();
const {
  ensureAuth,
  ensureGuest,
  isAdmin,
  notAdmin,
} = require("../middleware/auth");
const requestController = require("../Controllers/requestController");
const {
  getAllRequestForAdmin,
  updateRequestStatus,
} = require("../Controllers/authController");

router.post(
  "/new-request",
  ensureAuth,
  notAdmin,
  requestController.createRequest
);
router.get(
  "/delete-request/:id",
  ensureAuth,
  requestController.deleteRequest
);
router.get(
  "/request-form",
  ensureAuth,
  notAdmin,
  requestController.getRequestForm
);

router.get("/admin", ensureAuth, isAdmin, getAllRequestForAdmin);
router.get(
  "/admin/:requestId/:status",
  ensureAuth,
  isAdmin,
  updateRequestStatus
);

module.exports = router;
