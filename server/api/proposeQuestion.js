const router = require("express").Router();
const { ProposeQuestion, Tag } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allPropQuests = await ProposeQuestion.findAll({
      include: { model: Tag }
    });
    res.json(allPropQuests);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, name, description, difficulty, link, tagId } = req.body;
    await ProposeQuestion.create({
      userId,
      name,
      description,
      difficulty,
      link,
      tagId
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
