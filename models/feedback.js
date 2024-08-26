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
      feedback.hasMany(models.FeedbackReply, {
        foreignKey: 'feedbackId'
      });
    }
  }
  feedback.init({
    userID: {
      type: 'DataTypes.INTEGER',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserID cannot be null',
          args: true},
        notEmpty: {
          msg: 'UserID cannot be empty',
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
    feedbackContent: {
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
    },
    pictureUrl: {
      type: 'DataTypes.STRING',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Picture URL cannot be null',
          args: true},
        notEmpty: {
          msg: 'Picture URL cannot be empty',
          args: true
        },
        isUrl: true,
      }
    },
    status: {
      type: 'DataTypes.STRING',
      allowNull: false,
      defaultValue: 'unread',
      validate: {
        notNull: {
          msg: 'Status cannot be null',
          args: true
        },
        isIn: {
          args: [['read', 'unread']],
          msg: 'Status must be either "read" or "unread"'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};