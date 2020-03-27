const router = require("express").Router();
const { ProposeQuestion } = require("../db/models");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { name, description, difficulty, link, tagId } = req.body;
    await Question.create({
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
    await Question.destroy({ where: { id: req.params.questionId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
