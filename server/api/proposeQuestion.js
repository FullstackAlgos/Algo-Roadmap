const router = require("express").Router();
const { ProposeQuestion, Tag, User } = require("../db/models");
const { isAdmin, isLoggedIn } = require("./security");
module.exports = router;

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allPropQuests = await ProposeQuestion.findAll({
      include: [{ model: Tag }, { model: User }],
    });
    res.json(allPropQuests);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, name, description, difficulty, link, tagId } = req.body;
    await ProposeQuestion.create({
      userId,
      name,
      description,
      difficulty,
      link,
      tagId,
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:questionId", async (req, res, next) => {
  try {
    await ProposeQuestion.destroy({ where: { id: req.params.questionId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
