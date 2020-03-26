const router = require("express").Router();
const { Question, Tag, Like } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allQuestions = await Question.findAll({
      include: [{ model: Tag }, { model: Like }]
    });
    res.json(allQuestions);
  } catch (err) {
    next(err);
  }
});

router.get("/:questionId", async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.questionId);
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, difficulty, link, tags } = req.body;
    const question = await Question.create({
      name,
      description,
      difficulty,
      link
    });

    // add tags to QuestionTag table
    // still need to check if the tag already exists

    tags.forEach(async tagName => {
      let tag = await Tag.findOne({
        where: {
          name: tagName
        }
      });

      if (!tag) {
        tag = await Tag.create({
          name: tagName
        });
      }
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.put("/:questionId", async (req, res, next) => {
  try {
    const { id, name, description, tagId } = req.body;
    await Question.update(
      {
        name,
        description,
        tagId
      },
      { where: { id } }
    );
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:questionId", async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.questionId);

    if (!question) throw "Question id not found";

    await question.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
