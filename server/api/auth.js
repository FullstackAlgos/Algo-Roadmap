const router = require("express").Router();
const { User } = require("../db/database");

router.post("/signup", (req, res, next) => {
  User.create(req.body)
    .then(newUser => {
      req.login(newUser, err => {
        if (err) next(err);
        else res.status(200).json(newUser);
      });
    })
    .catch(next);
});

router.put("/login", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(curUser => {
      if (!curUser) {
        res.status(401).send("User not found");
      } else if (!curUser.correctPassword(req.body.password)) {
        res.status(401).send("Incorrect Password");
      } else {
        req.login(curUser, err => {
          if (err) next(err);
          else res.status(200).json(curUser);
        });
      }
    })
    .catch(next);
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get("/me", (req, res, next) => {
  res.json(req.user);
});

// --------------- GOOGLE TIME -------------------------
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

if (process.env !== "production") require("../../localSecrets");

router.get("/google", (req, res, next) => {
  console.log("First Google !");
  passport.authenticate("google", { scope: "email" });
});

passport.use(
  new GoogleStrategy(
    {
      log() {
        console.log("hello google");
      },
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (token, refreshToken, profile, done) => {
      console.log("Second Google --", profile);
      //   const info = {
      //     googleId: profile.id,
      //     name: profile.displayName,
      //     email: profile.emails[0].value
      //   };

      //   User.findOrCreate({
      //     where: { googleId: googleId },
      //     defaults: info
      //   })
      //     .spread(user => done(null, user))
      //     .catch(done);
      // }
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

      User.findOne({ where: { googleId: googleId } })
        .then(function(user) {
          if (!user) {
            return User.create({ name, email, googleId }).then(function(user) {
              done(null, user);
            });
          } else {
            done(null, user);
          }
        })
        .catch(done);
    }
  )
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = router;
