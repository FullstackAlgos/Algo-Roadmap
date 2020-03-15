const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/questions", require("./questions"));
router.use("/tags", require("./tags"));
router.use("/userQuestions", require("./userQuestions"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});
