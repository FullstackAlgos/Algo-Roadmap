const router = require("express").Router();
const { Question, Tag, Like } = require("../db/models");
const { isAdmin } = require("./security");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allQuestions = await Question.findAll({
      include: [{ model: Tag }, { model: Like }],
    });
    res.json(allQuestions);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, description, difficulty, link, tagId } = req.body;
    await Question.create({
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

router.put("/", isAdmin, async (req, res, next) => {
  try {
    const { id, name, description, tagId, difficulty } = req.body;
    await Question.update(
      {
        name,
        description,
        tagId,
        difficulty,
      },
      { where: { id } }
    );
    res.sendStatus(205);
  } catch (err) {
    next(err);
  }
});

router.delete("/:questionId", isAdmin, async (req, res, next) => {
  try {
    await Question.destroy({ where: { id: req.params.questionId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
