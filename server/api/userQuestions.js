const router = require("express").Router();
const { User, Question } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    if (!isNaN(req.params.userId)) {
      const userQuestions = await User.findOne({
        where: { id: req.params.userId },
        include: { model: Question }
      });

      res.json(userQuestions.dataValues.questions);
    } else res.json([]);
  } catch (err) {
    next(err);
  }
});
