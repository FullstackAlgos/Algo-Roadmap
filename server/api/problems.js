const router = require("express").Router();
const { Problem } = require("../db/models");
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
    console.log("inside -", req.body);
    const { name, description, difficulty, link } = req.body;
    const problem = await Problem.create({
      name,
      description,
      difficulty,
      link
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
