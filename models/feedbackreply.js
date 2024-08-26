'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FeedbackReply extends Model {
    static associate(models) {
      FeedbackReply.belongsTo(models.feedback, {
        foreignKey: 'feedbackId'
      });
      FeedbackReply.belongsTo(models.staff, {
        foreignKey: 'adminId'
      });
    }
  }
  FeedbackReply.init({
    feedbackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Feedback ID is required' },
        notEmpty: { msg: 'Feedback ID cannot be empty' }
      }
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Admin ID is required' },
        notEmpty: { msg: 'Admin ID cannot be empty' }
      }
    },
    replyContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Reply content is required' },
        notEmpty: { msg: 'Reply content cannot be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'FeedbackReply',
  });
  return FeedbackReply;
};
