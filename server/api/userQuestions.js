const router = require("express").Router();
const { UserQuestion } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res) => {
  try {
    const userQuestions = await UserQuestion.findAll({
      where: { userId: req.params.userId }
    });
    res.json(userQuestions);
  } catch (err) {
    next(err);
  }
});
