const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/UserModel");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_PASSWORD,
        callbackURL: "/api/v1/login/google",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = new User({
          mailId: profile.emails[0].value,
          name: profile.displayName,
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          image: profile.photos[0].value,
        });

        try {
          let user = await User.findOne({ mailId: profile.emails[0].value });
          if (user) done(null, user);
          else {
            if (profile._json.hd === "iitbbs.ac.in") {
              await newUser.save();
              done(null, newUser);
            } else done(null, null);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
