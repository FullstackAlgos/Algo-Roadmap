const router = require("express").Router();
const { Like, User, Question } = require("../db/models");
const { isLoggedIn, isAdmin } = require("./security");
module.exports = router;

router.get("/user/:userId", async (req, res, next) => {
  try {
    const likes = await Like.findAll({
      include: [{ model: User }, { model: Question }],
      where: { userId: req.params.userId },
    });
    res.json(likes);
  } catch (err) {
    next(err);
  }
});

router.get("/all", isAdmin, async (req, res, next) => {
  try {
    const likes = await Like.findAll({
      include: [{ model: User }, { model: Question }],
    });
    res.json(likes);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.create({ userId, questionId, status });

    const likes = await Like.findAll({
      include: [{ model: User }, { model: Question }],
      where: { userId },
    });

    res.status(201).json(likes);
  } catch (err) {
    next(err);
  }
});

router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.update(
      {
        status,
      },
      { where: { userId, questionId } }
    );

    const likes = await Like.findAll({
      include: [{ model: User }, { model: Question }],
      where: { userId },
    });

    res.status(201).json(likes);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:likeId", isAdmin, async (req, res, next) => {
  try {
    await Like.destroy({ where: { id: req.params.likeId } });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
