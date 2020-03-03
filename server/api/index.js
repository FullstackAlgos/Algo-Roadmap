const router = require("express").Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/problems', require('./problems'));
router.use('/tags', require('./tags'));


router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});