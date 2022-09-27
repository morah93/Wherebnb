'use strict';
const bcrypt = require('bcryptjs');
const { Model, validator } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/types/query-types');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; //user instance
      return{ id, username, email}
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserbyId(id) {
      return User.scope('currentUser').findByPk(id)
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 to *
      User.hasMany(models.Spot, { through: models.Booking, foreignKey: 'userId', otherKey: 'spotId', onDelete: 'CASCADE'})
      User.hasMany(models.Booking, {foriegnKey: 'userId'})
      User.hasMany(models.Review, {foriegnKey: 'userID'})
      User.hasMany(models.Spot, {foriegnKey: 'ownerID'})
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   len: [4, 30],
      //   isNotEmail(value) {
      //     if (validator.isEmail(value)) {
      //       throw new Error("Cannot be email.");
      //     }
      //   }
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword']}
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
