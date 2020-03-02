const express = require("express");
const path = require("path");
const morgan = require("morgan");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");

const { db, User } = require("./db/database");
const dbStore = new SequelizeStore({ db: db });
const app = express();

if (process.env.NODE_ENV == "development") require("../localSecrets");

// app.use(morgan("dev"));
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  console.log("SESSION: ", req.session);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use("/api", require("./api"));
app.use("/auth", require("./api/auth"));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(function(err, req, res, next) {
  console.error("Error Stack --", err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  console.log("Database synced!");
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});

// { force: true }
