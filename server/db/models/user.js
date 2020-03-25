const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: { arg: true, msg: "Please enter valid email!" }
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: { args: true, msg: "Please fill in a name!" }
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: { args: true, msg: "Please enter a password!" }
    },
    get() {
      return () => this.getDataValue("password");
    }
  },
  activeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  activeName: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  }
});

module.exports = User;

// INSTANCE METHODS TO CONVERT PASSWORD TO SALTED FOR CHECKS
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

// CLASS METHODS FOR PASSWORD PROTECTION
User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

// HOOKS FOR SALTING THE PASSWORD
const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
