'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedback.init({
    userId: {
      type: 'DataTypes.INTEGER',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cannot be null',
          args: true},
        notEmpty: {
          msg: 'UserId cannot be empty',
          args: true
        }
      }
    },
    userType: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Type cannot be null',
          args: true},
        notEmpty: {
          msg: 'User Type cannot be empty',
          args: true
        }
      }
    },
    feedbackTitle: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Feedback title cannot be null',
          args: true},
        notEmpty: {
          msg: 'Feedback title cannot be empty',
          args: true
        }
      }
    },
    feedbackDescription: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Feedback content cannot be null',
          args: true},
        notEmpty: {
          msg: 'Feedback content cannot be empty',
          args: true
        }
      }
    }
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};