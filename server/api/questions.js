const router = require("express").Router();
const { Question, Tag, QuestionTag } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allQuestions = await Question.findAll();
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

      await QuestionTag.create({ questionId: question.id, tagId: tag.id });
    });

    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.put("/:questionId", async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.questionId);

    if (!question) throw "Question id not found";

    if (req.body.id) delete req.body.id;
    await question.update(req.body);
    res.json(question);
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
