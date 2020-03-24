const router = require("express").Router();
const { Like } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.create({ userId, questionId, status });

    // SEND SOMETHING BACK
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.update(
      {
        status
      },
      { where: { userId, questionId } }
    );
  } catch (err) {
    next(err);
  }
});
