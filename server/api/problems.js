const router = require("express").Router();
const { Problem, Tag, ProblemTag } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allProblems = await Problem.findAll();
    res.json(allProblems);
  } catch (err) {
    next(err);
  }
});

router.get("/:problemId", async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.problemId);
    res.json(problem);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, difficulty, link, tags } = req.body;
    const problem = await Problem.create({
      name,
      description,
      difficulty,
      link
    });

    // add tags to ProblemTag table
    // still need to check if the tag already exists

    tags.forEach(async tagName => {
      let tag = await Tag.findOne({
        where: {
          name: tagName
        }
      });

      if(!tag) {
        tag = await Tag.create({
          name: tagName
        });
      }

      await ProblemTag.create({problemId: problem.id, tagId: tag.id});

    });

    res.json(problem);
  } catch (err) {
    next(err);
  }
});

router.put("/:problemId", async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.problemId);

    if (!problem) throw "problem id not found";

    if (req.body.id) delete req.body.id;
    await problem.update(req.body);
    res.json(problem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:problemId", async (req, res, next) => {
  try {
    const problem = await Problem.findByPk(req.params.problemId);

    if (!problem) throw "problem id not found";

    await problem.destroy();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
