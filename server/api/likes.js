const router = require("express").Router();
const { Like } = require("../db/models");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { userId, questionId, status } = req.body;
    await Like.create({ userId, questionId, status });

    // SEND SOMETHING BACK
  } catch (err) {
    next(err);
  }
});
