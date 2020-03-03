const router = require('express').Router()
const Sequelize = require('sequelize')
const {
  User
} = require('../db/models')
module.exports = router

// route to get all users and their interests
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get single user data
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
})
