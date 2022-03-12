const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    successRedirect: "/user/profile-page",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
