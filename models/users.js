'use strict';
const {
  Model
} = require('sequelize');

const { generateHash } = require('../helpers/hash_helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {...this.get(), id: undefined};
    }
  }

  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'name must not be empty' },
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' },
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password' },
        notEmpty: { msg: 'password must not be empty' },
        validatePassword: function(password) {
          if(password.length < 10) {
              throw new Error('Minimum ten characters should be present in password');
          }
        }
      },
    }, 
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role' },
        notEmpty: { msg: 'role must not be empty' },
      },
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });

  User.afterValidate(async (user, options) => {
    const hashedPassword = await generateHash(user.password);
    user.password = hashedPassword;
  });

  return User;
};