'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLike.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      UserLike.belongsTo(models.Post, {
        foreignKey: 'postId'
      });
    }
  }
  UserLike.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'UserId cannot be empty',
          args: true,
        }
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cannot be null',
          args: true,
        },
        notEmpty: {
          msg: 'UserId cannot be empty',
          args: true,
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserLike',
  });
  return UserLike;
};