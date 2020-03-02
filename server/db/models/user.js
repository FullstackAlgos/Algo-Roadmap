const Sequelize = require("sequelize");
const crypto = require("crypto");
const _ = require("lodash");

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: "This email has been taken!"
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Needs to be an actual email!"
        }
      }
    },
    password: {
      type: Sequelize.STRING
    },
    google_id: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);

User.prototype.correctPassword = function(candidatePassword) {
  return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ["password", "salt"]);
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash("sha1");
  hash.update(plainText);
  hash.update(salt);
  return hash.digest("hex");
};

function setSaltAndPassword(user) {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = User;
