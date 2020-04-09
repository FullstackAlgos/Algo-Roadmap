const router = require("express").Router();
const { User, Question, UserQuestion } = require("../db/models");
const { isLoggedIn } = require("./security");
module.exports = router;

router.get("/:userId", isLoggedIn, async (req, res, next) => {
  try {
    if (!isNaN(req.params.userId)) {
      const userQuestions = await User.findOne({
        where: { id: req.params.userId },
        include: { model: Question },
      });

      res.json(userQuestions.dataValues.questions);
    } else res.json([]);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, questionId } = req.body;

    await UserQuestion.create({ userId, questionId });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});
