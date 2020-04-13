const router = require("express").Router();
const { User, Question, Like } = require("../db/models");
const { isAdmin, isLoggedIn } = require("./security");
module.exports = router;

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.get("/all", isAdmin, async (req, res, next) => {
  try {
    const allUser = await User.findAll({
      include: [{ model: Question }, { model: Like }],
    });
    res.json(allUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // FINDING USER IN DB
    const user = await User.findOne({
      where: { email: email },
    });

    // CHECKING USER EXISTENCE AND CRITERIA
    if (!user) {
      console.log("No such user found:", email);
      res.status(401).send("Wrong email and/or password");
    } else if (!user.correctPassword(password)) {
      console.log("Incorrect password for user:", email);
      res.status(401).send("Wrong email and/or password");
    } else {
      // IF USER CHECKOUTS THEN SEND BACK TO FRONTEND
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    // CREATE USER IN DB AND SEND TO FRONTEND
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.put("/active", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, activeId, activeName } = req.body;

    await User.update(
      {
        activeId,
        activeName,
      },
      { where: { id: userId } }
    );

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put("/admin", isAdmin, async (req, res, next) => {
  try {
    const { userId, update } = req.body;

    await User.update({ isAdmin: update }, { where: { id: userId } });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", isAdmin, async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.userId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});
