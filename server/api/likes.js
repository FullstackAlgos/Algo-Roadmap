const router = require("express").Router();
const { Like } = require("../db/models");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { status, userId, questionId } = req.body;
    await Like.create({ status, userId, questionId });

    // SEND SOMETHING BACK
  } catch (err) {
    next(err);
  }
});
