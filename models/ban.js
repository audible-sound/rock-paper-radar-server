'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ban.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Ban.init({
    //ban works by checking if timestampUnbanned is before current date
    //timestampUnbanned is initialized with UNIX epoch - 1 Jan 1970 00:00:00UTC
    //when user is banned, timestampUnbanned updated to when user will be unbanned
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ban Row already exists for this user'
      },
      validate: {
        notNull: {
          msg: 'User ID cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'User ID cannot be empty',
          args: true,
        }
      }
    },
    timestampUnbanned: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Timestamp Unbanned cannot be empty',
          args: true
        },
        notEmpty: {
          msg: 'Timestamp Unbanned cannot be empty',
          args: true,
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Bans',
  });
  return Ban;
};